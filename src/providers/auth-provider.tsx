"use client";
import { useEffect } from "react";
import { useCurrentUser, useLogout } from "@/lib/hooks/use-auth";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authRefreshFailedEvent, apiUnauthorizedEvent } from "@/lib/api";
import { clearAuth, setUser } from "@/lib/redux/features/auth/authSlice";

export function AuthInitializer() {
  const logout = useLogout();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const isStoredAuthenticated =
    typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") === "true" : false;
  // (using lastChecked to determine if we've already attempted to fetch the user)
  const shouldFetchUser = isStoredAuthenticated && !authState.lastChecked;

  const { isError,isLoading, data: userData } = useCurrentUser({
    // Disable automatic fetching - we'll control it manually
    enabled: shouldFetchUser,
  });

  useEffect(() => {
    if (userData && !authState.user) {
      console.log("AuthInitializer: Setting user data in Redux state", userData);
      dispatch(setUser(userData));
    }
  }, [userData, authState.user, dispatch]);

  // Effect to handle the case where we think we're authenticated but no data is found
  useEffect(() => {
    if (isStoredAuthenticated && !isLoading && !userData && !authState.user && shouldFetchUser) {
      console.log("AuthInitializer: No user data found but isAuthenticated is true");
      localStorage.removeItem("isAuthenticated");
    }
  }, [isStoredAuthenticated, isLoading, userData, authState.user, shouldFetchUser]);

  // Handle error case
  useEffect(() => {
    if (isError && isStoredAuthenticated) {
      console.log("AuthInitializer: Error fetching user data");
      localStorage.removeItem("isAuthenticated");
      dispatch(clearAuth());
    }
  }, [isError, dispatch, isStoredAuthenticated]);

  // Auth event listeners - separate from auth check logic
  useEffect(() => {
    // Handler for refresh token failure
    const handleRefreshFailed = () => {
      console.log("AuthInitializer: Token refresh failed event received");
      logout.mutate();
    };

    // Handler for API unauthorized responses
    const handleApiUnauthorized = () => {
      console.log("AuthInitializer: API unauthorized event received");
      logout.mutate();
    };

    // Setup event listeners for auth-related events
    if (typeof window !== "undefined") {
      document.addEventListener(
        authRefreshFailedEvent?.type || "auth:refresh-failed",
        handleRefreshFailed
      );
      document.addEventListener(
        apiUnauthorizedEvent?.type || "auth:api-unauthorized",
        handleApiUnauthorized
      );
    }

    // Cleanup event listeners on unmount
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener(
          authRefreshFailedEvent?.type || "auth:refresh-failed",
          handleRefreshFailed
        );
        document.removeEventListener(
          apiUnauthorizedEvent?.type || "auth:api-unauthorized",
          handleApiUnauthorized
        );
      }
    };
  }, [logout]); // Only depends on logout mutation

  return null;
}
