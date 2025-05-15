"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/auth-service"; // Adjust the import path as needed
import type {
  User,
  UserCreate,
  UserUpdate,
  ActivateUserParams,
  SetPasswordParams,
  ResetPasswordParams,
  ResetPasswordConfirmParams,
  UserLogin,
} from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setUser, setAuthLoading, clearAuth } from "@/lib/redux/features/auth/authSlice";


type GoogleAuthResponse = {
  status: string;
  message: string;
  data: User;
};

// Query hook to fetch the current user
export function useCurrentUser(options = { enabled: true }) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // Default options for react-query
  const queryOptions = {
    enabled: options.enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Be careful with automatic refetching
    retry: (failureCount: number, error: { status?: number }) => {
      // Don't retry on 401 errors
      if (error?.status === 401) {
      // Clear the cache on auth errors
      queryClient.setQueryData(["currentUser"], null);
      return false;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    onSuccess: (data: User) => {
      // Sync successful user data with Redux
      dispatch(setUser(data));
    },
    onError: (error: { status: number; }) => {
      // Clear auth state on auth errors
      if (error?.status === 401) {
        dispatch(clearAuth());
      }
    },
  };

  // Use a query key that doesn't change frequently to prevent unnecessary requests
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      // Set loading state in Redux
      dispatch(setAuthLoading(true));

      try {
        // Add cache-busting parameter to prevent browsers from caching the request
        const response = await userService.getCurrentUser();
        return response;
      } catch (error) {
        // Handle 401 unauthorized errors
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response &&
          error.response.status === 401
        ) {
          localStorage.removeItem("isAuthenticated");
          // Re-throw with status for retry logic
          throw { ...error, status: 401 };
        }
        throw error;
      } finally {
        // Clear loading state regardless of outcome
        dispatch(setAuthLoading(false));
      }
    },
    ...queryOptions,
  });
}

// Hook for login functionality
export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      dispatch(setAuthLoading(true));
      return await userService.userLogin(credentials);
    },
    onSuccess: (data) => {
      // Update Redux state
      dispatch(setUser(data));

      // Invalidate queries that may depend on authentication
      queryClient.invalidateQueries({queryKey: ["currentUser"]});

      // Set authentication flag
      localStorage.setItem("isAuthenticated", "true");

      return data;
    },
    onError: (error) => {
      dispatch(clearAuth());
      return error;
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    },
  });
}

// Hook for logout functionality
export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      return await userService.logout();
    },
    onSuccess: () => {
      // Clear user data from React Query cache
      queryClient.setQueryData(["currentUser"], null);

      // Clear Redux auth state
      dispatch(clearAuth());

      // Remove authentication flag
      localStorage.removeItem("isAuthenticated");

      // Invalidate any other authenticated queries
      queryClient.invalidateQueries();
    },
    onError: () => {
      // Even on error, we should clear local state
      dispatch(clearAuth());
      queryClient.setQueryData(["currentUser"], null);
    },
  });
}


// Mutation hook for registering a new user
export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreate) => userService.register(data),
  });
}

// Mutation hook for Google OAuth authentication
export function useGoogleAuth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      state,
      code,
      user_type,
    }: {
      state: string;
      code: string;
      user_type?: string;
    }) => {
      const response = await userService.googleAuth(state, code, user_type);
      return response.data;
    },
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"], refetchType: "all" });
    },
    onError: (error: any) => {
      console.error("Google Auth error:", error);
    },
  });
}

// Mutation hook for activating a user
export function useActivate() {
  return useMutation({
    mutationFn: (params: ActivateUserParams) => userService.activate(params),
  });
}

// Mutation hook for updating the current user
export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<UserUpdate>) => userService.updateCurrentUser(data),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
    },
  });
}

// Mutation hook for setting a new password
export function useSetPassword() {
  return useMutation({
    mutationFn: (data: SetPasswordParams) => userService.setPassword(data),
  });
}

// Mutation hook for initiating a password reset
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordParams) => userService.resetPassword(data),
  });
}

// // Mutation hook for logging out
// export function useLogout(redirectUrl = "/auth/login") {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => userService.logout(),
//     onSuccess: () => {
//       // Clear auth state in Redux
//       dispatch(setUser(null));

//       // Clear React Query cache
//       queryClient.setQueryData(["currentUser"], null);
//       queryClient.invalidateQueries({ queryKey: ["currentUser"] });

//       if (redirectUrl) {
//         router.push(redirectUrl);
//       }
//     },
//     onError: (error) => {
//       console.error("Logout failed:", error);
//     },
//   });
// }

// Mutation hook for confirming a password reset
export function useResetPasswordConfirm() {
  return useMutation({
    mutationFn: (params: ResetPasswordConfirmParams) => userService.resetPasswordConfirm(params),
  });
}
