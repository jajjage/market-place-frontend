"use client";

import { throttle } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";

export function AuthLifecycleProvider({ children }: { children: React.ReactNode }) {
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();

  const lastActivityRef = useRef(Date.now());
  const lastRefreshRef = useRef(0);

  const { refetch: refetchUser } = useCurrentUser({
    enabled: typeof window !== "undefined" && localStorage.getItem("isAuthenticated") === "true",
  });

  // Separate function for actual token refresh logic
  const performTokenRefresh = useCallback(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;
    const timeSinceLastRefresh = now - lastRefreshRef.current;

    // Only refresh if:
    // 1. User has been idle for more than 10 minutes
    // 2. It's been at least 10 minutes since last refresh
    // 3. User is authenticated
    if (
      timeSinceLastActivity > 1000 * 60 * 10 &&
      timeSinceLastRefresh > 1000 * 60 * 10 &&
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      console.log("Performing token refresh due to inactivity");
      lastRefreshRef.current = now;
      refetchUser();

      queryClient.invalidateQueries({
        predicate: (q) =>
          q.state.status === "error" && (q.state.error as any)?.response?.status === 401,
      });
    }
  }, [refetchUser, queryClient]);

  // Throttled version - but only call when actually needed
  const handleTokenRefreshedThrottled = useCallback(
    throttle(performTokenRefresh, 1000 * 60 * 10, {
      leading: false,
      trailing: true,
    }),
    [performTokenRefresh]
  );

  // Simple activity tracker that doesn't trigger refresh
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    // Don't call handleTokenRefreshedThrottled here!
  }, []);

  // Separate interval to check for inactivity
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;

      // Only if user has been inactive for more than 10 minutes
      if (timeSinceLastActivity > 1000 * 60 * 10) {
        handleTokenRefreshedThrottled();
      }
    };

    // Check every 5 minutes for inactivity
    const interval = setInterval(checkInactivity, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, [handleTokenRefreshedThrottled]);

  // Listen for auth events
  useEffect(() => {
    const onTokenRefreshed = () => {
      console.log("Token refreshed event received");
      lastRefreshRef.current = Date.now();

      if (localStorage.getItem("isAuthenticated") === "true") {
        refetchUser();
        queryClient.invalidateQueries({
          predicate: (q) =>
            q.state.status === "error" && (q.state.error as any)?.response?.status === 401,
        });
      }
    };

    const onUnauthorized = () => {
      console.log("Unauthorized – clearing auth state");
      localStorage.removeItem("isAuthenticated");
      logoutMutation.mutate();
      queryClient.invalidateQueries();
    };

    window.addEventListener("auth:token-refreshed", onTokenRefreshed);
    window.addEventListener("auth:unauthorized", onUnauthorized);

    return () => {
      window.removeEventListener("auth:token-refreshed", onTokenRefreshed);
      window.removeEventListener("auth:unauthorized", onUnauthorized);
      handleTokenRefreshedThrottled.cancel();
    };
  }, [logoutMutation, queryClient, refetchUser, handleTokenRefreshedThrottled]);

  // Track user activity (but don't trigger refresh on every activity)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateActivity();
        // Only refresh if user was away for a long time
        const timeSinceLastActivity = Date.now() - lastActivityRef.current;
        if (timeSinceLastActivity > 1000 * 60 * 30) {
          // 30 minutes
          handleTokenRefreshedThrottled();
        }
      }
    };

    // Listen for user interactions (but don't refresh on each one)
    ["mousedown", "keypress", "scroll", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, updateActivity, { passive: true })
    );
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Initialize activity timestamp
    updateActivity();

    return () => {
      ["mousedown", "keypress", "scroll", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, updateActivity)
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [updateActivity, handleTokenRefreshedThrottled]);

  return <>{children}</>;
}
