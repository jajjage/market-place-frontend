"use client";

import { QueryClient } from "@tanstack/react-query";

// Create a production-ready query client with optimal settings for auth
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Default stale time for general queries
        staleTime: 1000 * 60 * 5, // 5 minutes

        // Retry settings optimized for auth scenarios
        retry: (failureCount, error: any) => {
          // Don't retry after 3 attempts
          if (failureCount >= 3) return false;

          // For 401 errors, only retry once to avoid infinite loops
          if (error?.response?.status === 401 && failureCount >= 1) {
            return false;
          }

          // Retry network errors and 5xx server errors
          return true;
        },

        // Exponential backoff with special handling for auth errors
        retryDelay: (attempt, error: any) => {
          // For 401s, wait a bit longer to allow token refresh to complete
          if (error?.response?.status === 401) {
            return 1500; // 1.5s delay for auth errors
          }

          // Standard exponential backoff for other errors
          return Math.min(1000 * 2 ** attempt, 30000);
        },

        // Refetch on window focus for auth-critical queries
        refetchOnWindowFocus: true,

        // Refetch on reconnect for better offline handling
        refetchOnReconnect: true,
      },
    },
  });
};

// Singleton instance management
let queryClientInstance: QueryClient | null = null;

export const getQueryClient = () => {
  if (!queryClientInstance && typeof window !== "undefined") {
    queryClientInstance = createQueryClient();

    // Set up global refresh listener
    window.addEventListener("auth:token-refreshed", () => {
      // When token refreshes, invalidate failed queries to retry them
      queryClientInstance?.invalidateQueries({
        predicate: (query) => {
          const error = query.state.error as any;
          return query.state.status === "error" && error?.response?.status === 401;
        },
      });
    });

    // Set up global unauthorized listener
    window.addEventListener("auth:unauthorized", () => {
      // On auth failure, reset current user but keep entry in cache
      queryClientInstance?.setQueryData(["currentUser"], null);
      // Mark all queries as stale
      queryClientInstance?.invalidateQueries();
    });
  }

  return queryClientInstance || createQueryClient();
};

export default getQueryClient;
