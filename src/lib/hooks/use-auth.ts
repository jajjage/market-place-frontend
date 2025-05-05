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

type GoogleAuthResponse = {
  status: string;
  message: string;
  data: User;
};

// Query hook to fetch the current user
export function useCurrentUser(p0: { enabled: boolean }) {
  const queryClient = useQueryClient();

  // Default to NOT auto-fetching unless specifically enabled
  const queryOptions = {
    enabled: p0.enabled, // Use the enabled parameter
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount: number, error: { status: number }) => {
      // Don't retry on 401 errors
      if (error?.status === 401) {
        // Clear the cache on auth errors
        queryClient.setQueryData(["currentUser"], null);
        return false;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
  };

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await userService.getCurrentUser();
        // If successful, we are authenticated
        localStorage.setItem("isAuthenticated", "true");
        return response;
      } catch (error) {
        // If 401, we're definitely not authenticated
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object" &&
          (error as any).response !== null &&
          "status" in (error as any).response &&
          (error as any).response.status === 401
        ) {
          localStorage.removeItem("isAuthenticated");
          // Re-throw with status for retry logic
          throw { ...error, status: 401 };
        }
        throw error;
      }
    },
    ...queryOptions,
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
      queryClient.setQueryData(["currentUser"], data);
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

// Mutation hook for user login
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      userService.userLogin(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      // On successful login, set our client-side indicator
      localStorage.setItem("isAuthenticated", "true");
    },
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

// Mutation hook for logging out
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      // Always clean up client-side state regardless of API success
      localStorage.removeItem("isAuthenticated");

      // Clear the React Query cache
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// Mutation hook for confirming a password reset
export function useResetPasswordConfirm() {
  return useMutation({
    mutationFn: (params: ResetPasswordConfirmParams) => userService.resetPasswordConfirm(params),
  });
}
