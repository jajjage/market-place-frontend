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

// Query hook to fetch the current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    // Optional: Add retry, staleTime, etc., as needed
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
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
    },
  });
}

// Mutation hook for confirming a password reset
export function useResetPasswordConfirm() {
  return useMutation({
    mutationFn: (params: ResetPasswordConfirmParams) => userService.resetPasswordConfirm(params),
  });
}
