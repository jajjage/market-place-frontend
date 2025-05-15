import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

// Extend Axios config to include custom properties for deduplication and retry logic
declare module "axios" {
  export interface InternalAxiosRequestConfig extends AxiosRequestConfig {
    __requestFingerprint?: string;
    __pendingDuplicate?: boolean;
    __responsePromise?: Promise<any>;
    __resolvePromise?: (value?: any) => void;
    __rejectPromise?: (reason?: any) => void;
    _retry?: boolean;
    _pathIsAuthRelated?: boolean;
    skipDeduplication?: boolean;
  }
}

// Create custom events for auth flow
export const authRefreshFailedEvent = new CustomEvent("auth:refresh-failed");
export const apiUnauthorizedEvent = new CustomEvent("auth:api-unauthorized");

// Request deduplication tracking
const pendingRequests = new Map();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// Track if we've already logged out to prevent infinite loops
let hasLoggedOut = false;

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(undefined);
  });
  failedQueue = [];
};

// Reset the logout flag after some time to allow future login attempts
const resetLogoutFlag = () => {
  setTimeout(() => {
    hasLoggedOut = false;
  }, 5000); // Wait 5 seconds before allowing another auth check
};

// Create request fingerprint for deduplication
const getRequestFingerprint = (config: InternalAxiosRequestConfig<any>) => {
  const { method, url, params, data } = config;
  return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
};

// Request interceptor for deduplication
api.interceptors.request.use(
  async (config) => {
    // Skip deduplication for specific endpoints if needed
    const skipDeduplication = config.skipDeduplication === true;

    if (!skipDeduplication) {
      const fingerprint = getRequestFingerprint(config);

      // If we already have this exact request in flight, wait for it instead of sending a duplicate
      if (pendingRequests.has(fingerprint)) {
        // Return a promise that resolves when the original request completes
        return new Promise((resolve, reject) => {
            (pendingRequests.get(fingerprint) as Promise<any>).then(
            (response: any) => {
              // Clone the response to avoid issues with multiple handlers
              resolve({ ...config, __pendingDuplicate: true, __responsePromise: response });
            },
            (error: any) => reject(error)
            );
        });
      }

      // Store this request in our pending map
      config.__requestFingerprint = fingerprint;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for deduplication cleanup
api.interceptors.response.use(
  (response) => {
    // If this is a duplicate request that's already completed, just return the response
    if (response.config?.__pendingDuplicate && response.config?.__responsePromise) {
      return response.config.__responsePromise;
    }

    // If this was an original request, remove it from pending and resolve for any duplicates
    const fingerprint = response.config?.__requestFingerprint;
    if (fingerprint && pendingRequests.has(fingerprint)) {
      pendingRequests.delete(fingerprint);
    }

    return response;
  },
  async (error) => {
    // Clean up pending request tracking on error too
    const fingerprint = error.config?.__requestFingerprint;
    if (fingerprint && pendingRequests.has(fingerprint)) {
      pendingRequests.delete(fingerprint);
    }

    const originalRequest = error.config;

    // Check if the request path is auth-related to avoid loops
    const url = originalRequest.url || "";
    const isAuthRelated =
      url.includes("auth/o") ||
      url.includes("auth/login") ||
      url.includes("auth/logout") ||
      url.includes("auth/refresh") ||
      url.includes("auth/verify");

    originalRequest._pathIsAuthRelated = isAuthRelated;

    // For auth-related paths that return 401, dispatch refresh failed event
    if (error.response?.status === 401 && isAuthRelated) {
      // This is from an auth endpoint (like refresh token), so we are truly logged out
      if (!hasLoggedOut) {
        hasLoggedOut = true;
        document.dispatchEvent(authRefreshFailedEvent);
        resetLogoutFlag();
      }
      return Promise.reject(error);
    }

    // Only handle 401 once for non-auth-related requests
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !hasLoggedOut &&
      !originalRequest._pathIsAuthRelated
    ) {
      // mark so we don't loop
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue this request until the in‑flight refresh finishes
        try {
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          return await api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      isRefreshing = true;

      // call your refresh endpoint; it should set a new access cookie
      try {
        try {
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/refresh/`,
            {},
            { withCredentials: true }
          );

          // Check if refresh was successful
          if (refreshResponse.status >= 200 && refreshResponse.status < 300) {
            // all queued requests can now retry
            processQueue(null);
            return await api(originalRequest);
          } else {
            throw new Error("Refresh failed");
          }
        } catch (refreshErr) {
          processQueue(refreshErr);

          // Set the flag to prevent infinite loops
          hasLoggedOut = true;

          // Dispatch the API unauthorized event
          document.dispatchEvent(apiUnauthorizedEvent);

          // Reset the flag after some time
          resetLogoutFlag();

          return Promise.reject(refreshErr);
        }
      } finally {
        isRefreshing = false;
      }
    }

    // If we already tried refreshing and still got 401, dispatch unauthorized event
    if (
      error.response?.status === 401 &&
      originalRequest._retry &&
      !originalRequest._pathIsAuthRelated
    ) {
      // Only dispatch if we haven't logged out yet
      if (!hasLoggedOut) {
        hasLoggedOut = true;
        document.dispatchEvent(apiUnauthorizedEvent);
        resetLogoutFlag();
      }
    }

    // any other error we just pass along
    return Promise.reject(error);
  }
);

// Record the request promise in our pending map for deduplication
api.interceptors.request.use((config) => {
  if (config.__requestFingerprint && !config.__pendingDuplicate) {
    // Store the promise for this request so duplicates can use it
    const responsePromise = new Promise((resolve, reject) => {
      // The promise will be resolved/rejected in the response interceptor
      config.__resolvePromise = resolve;
      config.__rejectPromise = reject;
    });

    pendingRequests.set(config.__requestFingerprint, responsePromise);
  }
  return config;
});

// Update the promise for the request when it completes
api.interceptors.response.use(
  (response) => {
    if (response.config.__resolvePromise) {
      response.config.__resolvePromise(response);
    }
    return response;
  },
  (error) => {
    if (error.config?.__rejectPromise) {
      error.config.__rejectPromise(error);
    }
    return Promise.reject(error);
  }
);

export default api;
