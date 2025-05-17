"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks/use-auth";

// Simplified AuthProvider that handles token refresh and inactivity
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const lastActivityRef = useRef(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-fetch current user data
  const { refetch: refetchUser } = useCurrentUser();

  // Listen for auth events
  useEffect(() => {
    // Handle token refresh events
    const handleTokenRefreshed = () => {
      console.log("Token refreshed - updating user data");
      refetchUser();
    };

    // Handle unauthorized events (logout)
    const handleUnauthorized = () => {
      console.log("Unauthorized - clearing auth state");
      localStorage.removeItem("isAuthenticated");
      queryClient.setQueryData(["currentUser"], null);
    };

    // Add event listeners
    window.addEventListener("auth:token-refreshed", handleTokenRefreshed);
    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("auth:token-refreshed", handleTokenRefreshed);
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [queryClient, refetchUser]);

  // Track user activity to handle token refresh before expiration
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Update last activity timestamp on user interaction
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      resetInactivityTimer();
    };

    // Reset inactivity timer
    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Only set timer if user is authenticated
      if (localStorage.getItem("isAuthenticated") === "true") {
        inactivityTimerRef.current = setTimeout(
          () => {
            const currentTime = Date.now();
            const inactiveTime = currentTime - lastActivityRef.current;

            // If inactive for more than 10 minutes, proactively refresh user data
            // This helps prevent the token from expiring without notice
            if (inactiveTime > 1000 * 60 * 10) {
              console.log("User inactive, proactively refreshing auth state");
              refetchUser();
            }
          },
          1000 * 60 * 10
        ); // Check every 10 minutes
      }
    };

    // Set up activity listeners
    const events = ["mousedown", "keypress", "scroll", "touchstart", "visibilitychange"];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    // Also check when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentTime = Date.now();
        const inactiveTime = currentTime - lastActivityRef.current;

        // If page was hidden for more than 5 minutes, refresh user data
        if (inactiveTime > 1000 * 60 * 5) {
          console.log("Page visible after inactivity, refreshing auth state");
          refetchUser();
        }

        lastActivityRef.current = currentTime;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial setup
    resetInactivityTimer();

    return () => {
      // Cleanup
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [refetchUser]);

  return <>{children}</>;
}
