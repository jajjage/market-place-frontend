"use client";

import { throttle } from "lodash";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";

// Simplified AuthLifecycleProvider with a single throttled refresh handler
export function AuthLifecycleProvider({ children }: { children: React.ReactNode }) {
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();

  const lastActivityRef = useRef(Date.now());

  // Auto-fetch current user data only when authenticated
  const { refetch: refetchUser } = useCurrentUser({
    enabled: typeof window !== "undefined" && localStorage.getItem("isAuthenticated") === "true",
  });

  // Throttled token-refresh/inactivity handler: max once per 10 minutes
  const handleTokenRefreshedThrottled = throttle(
    () => {
      const inactive = Date.now() - lastActivityRef.current;

      // only refresh if truly idle for >10m
      if (inactive > 1000 * 60 * 10 && localStorage.getItem("isAuthenticated") === "true") {
        console.log("Throttled refresh: updating user data and clearing 401 queries");
        refetchUser();

        // Invalidate any queries that errored with a 401
        queryClient.invalidateQueries({
          predicate: (q) =>
            q.state.status === "error" && (q.state.error as any)?.response?.status === 401,
        });
      }
    },
    1000 * 60 * 10
  );

  // Listen for token-refreshed & unauthorized events
  useEffect(() => {
    const onTokenRefreshed = () => {
      handleTokenRefreshedThrottled();
    };

    const onUnauthorized = () => {
      console.log("Unauthorized – clearing auth state");
      localStorage.removeItem("isAuthenticated");

      // run your logout mutation (which should also clear Redux, redirect, etc)
      logoutMutation.mutate();

      // clear any leftover queries
      queryClient.invalidateQueries();
    };

    window.addEventListener("auth:token-refreshed", onTokenRefreshed);
    window.addEventListener("auth:unauthorized", onUnauthorized);

    return () => {
      window.removeEventListener("auth:token-refreshed", onTokenRefreshed);
      window.removeEventListener("auth:unauthorized", onUnauthorized);
      handleTokenRefreshedThrottled.cancel();
    };
  }, [logoutMutation, queryClient, handleTokenRefreshedThrottled]);

  // Track user activity & visibility
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      handleTokenRefreshedThrottled();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateActivity();
      }
    };

    // Listen for user interactions
    ["mousedown", "keypress", "scroll", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, updateActivity)
    );
    document.addEventListener("visibilitychange", onVisibilityChange);

    // seed the timer on mount
    updateActivity();

    return () => {
      ["mousedown", "keypress", "scroll", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, updateActivity)
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [handleTokenRefreshedThrottled]);

  return <>{children}</>;
}
