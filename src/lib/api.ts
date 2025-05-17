import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create simplified axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Track refresh token state
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let failedQueue: { resolve: Function; reject: Function }[] = [];

// Process queued requests after token refresh
const processQueue = (error: Error | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Ignore auth-related endpoints to prevent infinite loops
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/logout") ||
      originalRequest.url?.includes("/auth/refresh");

    // Handle 401 errors for non-auth endpoints
    if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        try {
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          // After refresh completes, retry original request
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Start refresh process
      isRefreshing = true;

      try {
        // Use shared promise to prevent multiple refresh calls
        if (!refreshPromise) {
          refreshPromise = axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/refresh/`,
            {},
            { withCredentials: true }
          );
        }

        const response = await refreshPromise;

        // Reset refresh promise
        refreshPromise = null;

        if (response.status === 200) {
          // Notify all waiting requests to proceed
          processQueue(null);

          // Dispatch event for components to refetch data
          window.dispatchEvent(new CustomEvent("auth:token-refreshed"));

          // Retry original request
          return api(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        // Notify waiting requests about the failure
        processQueue(refreshError as Error);

        // Dispatch logout event
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle refresh endpoint failures
    if (error.response?.status === 401 && originalRequest.url?.includes("/auth/refresh")) {
      // Clear auth state on refresh failure
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default api;
