import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "@/lib/redux/store";
import { logout as logoutAction } from "./redux/features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (err: any) => void;
}> = [];

// Track if we've already logged out to prevent infinite loops
let hasLoggedOut = false;

const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  failedQueue = [];
};

// Reset the logout flag after some time to allow future login attempts
const resetLogoutFlag = () => {
  setTimeout(() => {
    hasLoggedOut = false;
  }, 5000); // Wait 5 seconds before allowing another auth check
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _pathIsAuthRelated?: boolean;
    };

    // Check if the request path is auth-related to avoid loops
    const url = originalRequest.url || "";
    const isAuthRelated =
      url.includes("/auth/") ||
      url.includes("/login") ||
      url.includes("/logout") ||
      url.includes("/refresh");

    originalRequest._pathIsAuthRelated = isAuthRelated;

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

          // if refresh failed, dispatch logout action
          store.dispatch(logoutAction());

          // Reset the flag after some time
          resetLogoutFlag();

          return Promise.reject(refreshErr);
        }
      } finally {
        isRefreshing = false;
      }
    }

    // any other error we just pass along
    return Promise.reject(error);
  }
);

export default api;
