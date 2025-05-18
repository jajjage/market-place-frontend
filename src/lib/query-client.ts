import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Create a production-ready query client with optimal settings for auth
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Default stale time for general queries
        staleTime: 1000 * 60 * 5, // 5 minutes

        // Retry settings optimized for auth scenarios
        retry: (failureCount, error: any) => {
          if (failureCount >= 3) return false;
          if (error?.response?.status === 401 && failureCount >= 1) {
            return false;
          }
          return true;
        },

        // Exponential backoff with special handling for auth errors
        retryDelay: (attempt, error: any) => {
          if (error?.response?.status === 401) {
            return 1500; // 1.5s delay for auth errors
          }
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
    // 1) Create the client
    queryClientInstance = createQueryClient();

    // 3) Set up persistence to localStorage
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient: queryClientInstance,
      persister: localStoragePersister,
      maxAge: 1000 * 60 * 60, // keep cache for 1 hour
    });
  }

  return queryClientInstance || createQueryClient();
};

export default getQueryClient;
