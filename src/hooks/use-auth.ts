"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import userService from "@/services/auth-service"; // Adjust the import path as needed
import type {
  User,
  UserCreate,
  UserUpdate,
  ActivateUserParams,
  SetPasswordParams,
  ResetPasswordParams,
  ResetPasswordConfirmParams,
  UserProfile,
} from "@/types/user";
import { useAppDispatch } from "@/lib/redux/store";
import { setUser, setAuthLoading, clearAuth } from "@/lib/redux/features/auth/authSlice";
import { useEffect } from "react";

export function useCurrentUser(options = { enabled: true }) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // Check if user is authenticated from localStorage
  const isAuthenticated =
    typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") === "true" : false;

  const query = useQuery({
    queryKey: ["currentUser"],

    queryFn: async () => {
      dispatch(setAuthLoading(true));
      try {
        const response = await userService.getCurrentUser();

        // Update auth state in localStorage
        localStorage.setItem("isAuthenticated", "true");

        return response;
      } catch (error: any) {
        // Clear auth state on 401 errors
        if (error?.response?.status === 401) {
          localStorage.removeItem("isAuthenticated");
        }
        throw error;
      } finally {
        dispatch(setAuthLoading(false));
      }
    },

    // Configuration for optimal behavior
    enabled: options.enabled && isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry 401s at all as we know we're not authenticated
      const is401 = error?.response?.status === 401;
      if (is401) return false;

      // Standard retry logic for other errors
      return failureCount < 2;
    },
    retryDelay: 1500, // Slightly longer delay to allow token refresh
  });

  // Sync query results with Redux and handle authentication state
  useEffect(() => {
    if (query.data) {
      dispatch(setUser(query.data));
      localStorage.setItem("isAuthenticated", "true");
    } else if (query.error) {
      dispatch(clearAuth());
      localStorage.removeItem("isAuthenticated");
    }
  }, [query.data, query.error, dispatch]);

  return query;
}

// Optimized login hook
export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      dispatch(setAuthLoading(true));
      return await userService.userLogin(credentials);
    },

    onSuccess: (data) => {
      // Set auth state
      localStorage.setItem("isAuthenticated", "true");

      // Force refresh of user data
      queryClient.refetchQueries({ queryKey: ["currentUser"] });

      return data;
    },

    onError: () => {
      dispatch(clearAuth());
      localStorage.removeItem("isAuthenticated");
    },

    onSettled: () => {
      dispatch(setAuthLoading(false));
    },
  });
}

// Simplified logout hook
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      return await userService.logout();
    },
    onMutate: () => {
      // Optionally, you can set a loading state here
      dispatch(setAuthLoading(true));
    },

    onSuccess: async () => {
      // Clear auth state
      dispatch(clearAuth());
      localStorage.removeItem("isAuthenticated");

      // Update query cache but don't remove entry
      await queryClient.clear();
      router.replace("/auth/login");
    },

    onError: () => {
      // Even on error, clear local state
      dispatch(clearAuth());
      localStorage.removeItem("isAuthenticated");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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

// Improved Google OAuth authentication hook that properly syncs with Redux and forces a refetch
export function useGoogleAuth() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

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
      dispatch(setAuthLoading(true));
      try {
        const response = await userService.googleAuth(state, code, user_type);
        return response.data;
      } finally {
        dispatch(setAuthLoading(false));
      }
    },

    onSuccess: async (data: User) => {
      // 1. Update localStorage to indicate authenticated state
      localStorage.setItem("isAuthenticated", "true");

      // 3. Force a fresh fetch of current user data
      try {
        // Remove existing user data from cache to ensure a fresh fetch
        queryClient.removeQueries({ queryKey: ["currentUser"] });

        // Manually fetch fresh user data
        const userData = await userService.getCurrentUser();

        // Update Redux state with complete user data
        dispatch(setUser(userData));

        // Update React Query cache with fresh data
        queryClient.setQueryData(["currentUser"], userData);
      } catch (error) {
        console.error("Failed to fetch user data after Google auth:", error);

        // Fall back to using whatever data we got from the Google auth response
        if (data && data.id) {
          dispatch(setUser(data));
          queryClient.setQueryData(["currentUser"], data);
        }
      } finally {
        // Ensure we clear loading state after everything is done
        dispatch(setAuthLoading(false));
      }
    },

    onError: (error: any) => {
      console.error("Google Auth error:", error);
      // Ensure we clear loading state on error
      dispatch(setAuthLoading(false));

      // Make sure we don't have stale authentication state
      localStorage.removeItem("isAuthenticated");
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
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => userService.updateCurrentUser(data),
    onSuccess: (updatedUser: User) => {
      toast({
        title: "Success",
        description: "Your profile has been updated successfully",
      });

      // Invalidate and refetch current user data to ensure it's up to date
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      router.push("/dashboard/seller/profile");
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
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
