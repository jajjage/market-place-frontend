"use client";
import { useEffect } from "react";
import { useCurrentUser, useLogout } from "@/lib/hooks/use-auth";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authRefreshFailedEvent, apiUnauthorizedEvent } from "@/lib/api";

export function AuthInitializer() {
  const logout = useLogout();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const { refetch } = useCurrentUser({
    // Disable automatic fetching - we'll control it manually
    enabled: false,
  });

  // Handle initial authentication check - runs only once on mount
  useEffect(() => {
    // Initial check function - this only runs once
    const initialAuthCheck = async () => {
      // Check if we have local storage flag set but no user data yet
      const isStoredAuthenticated = localStorage.getItem("isAuthenticated") === "true";

      if (
        isStoredAuthenticated &&
        !authState.user &&
        !authState.isLoading &&
        !authState.lastChecked
      ) {
        // We think we're authenticated based on localStorage, but need to verify
        console.log("AuthInitializer: Performing initial auth verification");
        try {
          await refetch();
        } catch (err) {
          // Error handled in useCurrentUser hook
          console.log("AuthInitializer: Initial auth check failed", err);
        }
      }
    };

    initialAuthCheck();
  }, []); // Empty dependency array - only run on mount

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
