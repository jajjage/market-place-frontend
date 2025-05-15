"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/store";
import { useCurrentUser } from "@/lib/hooks/use-auth";
import { setUser } from "@/lib/redux/features/auth/authSlice";

/**
 * Custom hook to check if the user is authenticated
 * Use this in components that need auth state
 */
export function useAuthCheck() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Set up query but don't enable auto-fetching yet
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useCurrentUser({
    enabled: false, // We'll manually trigger when needed
  });

  // Check auth status when component mounts if needed
  useEffect(() => {
    // If redux says we're authenticated but we don't have user data
    // this could happen if the app is refreshed and redux state is lost
    const checkAuth = async () => {
      if (!user && isAuthenticated) {
        try {
          await refetch();
        } catch (error) {
          console.error("Auth check failed:", error);
          // Let the 401 handler in API client handle this
        }
      }
    };

    checkAuth();
  }, [user, isAuthenticated, refetch]);

  // Update Redux store when user data is fetched
  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUser(userData));
    } else if (isError) {
      dispatch(setUser(null));
    }
  }, [isSuccess, isError, userData, dispatch]);

  // Verify the current auth state
  const verifyAuth = async () => {
    try {
      const result = await refetch();
      return !!result.data;
    } catch (error) {
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    verifyAuth,
  };
}
