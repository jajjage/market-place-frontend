"use client";
import { useEffect, useState } from "react";
import { useCurrentUser, useLogout } from "@/lib/hooks/use-auth";
import { setUser } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authRefreshFailedEvent, apiUnauthorizedEvent } from "@/lib/api";

export function AuthInitializer() {
  const {
    data: userData,
    isSuccess,
    isError,
    error,
    refetch,
  } = useCurrentUser({
    // Disable auto-fetching
    enabled: false,
  });
  const logout = useLogout();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") === "true" : false
  );

  // Main auth effect: handle authentication state and events
  useEffect(() => {
    // Initial auth check function
    const checkAuth = () => {
      if (authState.user || isAuthenticated) {
        console.log("Auth state indicates logged in, checking user data");
        refetch().catch((err) => {
          if (err?.status === 401) {
            handleUnauthenticated();
          }
        });
      }
    };

    // Handle unauthorized state consistently
    const handleUnauthenticated = () => {
      console.log("User unauthorized, clearing auth state");
      dispatch(setUser(null));
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    };

    // Auth event handlers
    const handleRefreshFailed = () => {
      console.log("Token refresh failed event received, logging out");
      logout.mutate();
      handleUnauthenticated();
    };
    const handleApiUnauthorized = () => {
      console.log("API unauthorized event received, logging out");
      logout.mutate();
      handleUnauthenticated();
    };

    const handleRouteChange = () => {
      console.log("Route changed, checking auth if needed");
      checkAuth();
    };

    // Initial auth check on component mount
    checkAuth();

    // Setup event listeners
    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handleRouteChange);
      document.addEventListener(
        authRefreshFailedEvent?.type || "auth:refresh-failed",
        handleRefreshFailed
      );
      document.addEventListener(
        apiUnauthorizedEvent?.type || "auth:api-unauthorized",
        handleApiUnauthorized
      );
    }

    // Cleanup event listeners
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", handleRouteChange);
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
  }, [authState.user, isAuthenticated, refetch, logout, dispatch]);

  // Handle user data changes
  useEffect(() => {
    if (isSuccess && userData) {
      console.log("User data fetched successfully, updating state");
      dispatch(setUser(userData));
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else if (isError && error?.status === 401) {
      console.log("User fetch failed with 401, clearing user state");
      dispatch(setUser(null));
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    }
  }, [isSuccess, userData, isError, error, dispatch]);

  return null;
}
