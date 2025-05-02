"use client";

import { useEffect } from "react";
import { useCurrentUser, useLogout } from "@/lib/hooks/use-auth";
import { setUser } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/store";

import { authRefreshFailedEvent, apiUnauthorizedEvent } from "@/lib/api";

export function AuthInitializer() {
  const { data: userData, isSuccess } = useCurrentUser();
  const logout = useLogout();
  const dispatch = useAppDispatch();

  // Handle user data when it changes
  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUser(userData));
    }
  }, [isSuccess, userData, dispatch]);

  // Listen for auth events
  useEffect(() => {
    // This runs when the refresh token endpoint itself returns 401
    // It means we're definitely logged out
    const handleRefreshFailed = () => {
      console.log("Token refresh failed, logging out");
      logout.mutate();
      dispatch(setUser(null));
    };

    // This runs when a regular API endpoint returns 401
    // The interceptor has already tried to refresh the token and that failed too
    const handleApiUnauthorized = () => {
      console.log("API unauthorized and refresh failed, logging out");
      logout.mutate();
      dispatch(setUser(null));
    };

    // Add event listeners using the imported event types
    document.addEventListener(authRefreshFailedEvent.type, handleRefreshFailed);
    document.addEventListener(apiUnauthorizedEvent.type, handleApiUnauthorized);

    // Clean up
    return () => {
      document.removeEventListener(authRefreshFailedEvent.type, handleRefreshFailed);
      document.removeEventListener(apiUnauthorizedEvent.type, handleApiUnauthorized);
    };
  }, [logout, dispatch]);

  // This component doesn't render anything
  return null;
}
