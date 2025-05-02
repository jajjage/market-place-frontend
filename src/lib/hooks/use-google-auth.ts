"use client";

import { useState, useEffect } from "react";
import { useGoogleAuth as googleAuth, useUpdateCurrentUser } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface HandleRoleSelectResult {
  success: boolean;
  message: string;
}

type RoleType = "SELLER" | "BUYER";

interface RouterType {
  push: (path: string) => void;
}

interface UseGoogleAuthParams {
  state: string;
  code: string;
}

export function useGoogleAuth({ state, code }: UseGoogleAuthParams) {
  const router: RouterType = useRouter();
  const googleMutation = googleAuth();
  const updateUserMutation = useUpdateCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  // Get the auth mode from localStorage (login or signup)
  const authMode =
    typeof window !== "undefined" ? localStorage.getItem("googleAuthMode") || "signup" : "signup";

  // Clear URL parameters to prevent reusing the auth code
  const clearAuthParams = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  // Check if code is expired
  const isCodeExpired = () => {
    if (typeof window !== "undefined") {
      const codeTimestamp = localStorage.getItem("oauth_code_timestamp");
      const currentTime = Date.now();

      // If we have a timestamp and it's older than 5 minutes, it's expired
      if (codeTimestamp && currentTime - parseInt(codeTimestamp) > 300000) {
        localStorage.removeItem("oauth_code_timestamp");
        return true;
      }

      // Set timestamp if not already set
      if (!codeTimestamp) {
        localStorage.setItem("oauth_code_timestamp", currentTime.toString());
      }
    }
    return false;
  };

  // Process the Google authentication
  const processGoogleAuth = async () => {
    // Skip if we've already attempted auth or parameters aren't available
    if (authAttempted || !state || !code || Array.isArray(state) || Array.isArray(code)) {
      !authAttempted && setError("Missing or invalid authentication parameters");
      clearAuthParams();
      return;
    }

    // Check if code is expired
    if (isCodeExpired()) {
      setError("Authentication session expired. Please try again.");
      clearAuthParams();
      return;
    }

    // Mark that we've attempted authentication
    setAuthAttempted(true);

    try {
      console.log("Processing Google auth with mode:", authMode);

      // Define the expected response type
      type GoogleAuthResponse = User & {
        payload?: { message?: string };
        user_type?: string;
      };

      // Call your service to authenticate with Google
      const response = (await googleMutation.mutateAsync({ state, code })) as GoogleAuthResponse;
      console.log("Google auth response:", response);

      // Clear URL parameters after processing to prevent reuse
      clearAuthParams();

      // Check if user exists and has a role
      if (response) {
        setUserData(response);

        // If user has a role, redirect to the appropriate dashboard
        const userType = response.user_type;
        console.log("User type from payload:", userType);

        console.log("User payload user_type:", userType);

        if (userType) {
          console.log("User has role, redirecting to dashboard:", userType);
          // Clear the auth mode from localStorage
          localStorage.removeItem("googleAuthMode");
          localStorage.removeItem("oauth_code_timestamp");

          const callbackUrl = localStorage.getItem("callbackUrl");
          if (callbackUrl) {
            console.log("Redirecting to callback URL:", callbackUrl);
            window.location.href = callbackUrl;
            localStorage.removeItem("callbackUrl"); // Clean up after use
            return;
          } else {
            // Redirect to the dashboard
            router.push(userType === "SELLER" ? "/dashboard/seller" : "/dashboard");
            return;
          }
        }

        setShowRoleSelection(true);
        setIsLoading(false);
      } else {
        console.error("Authentication rejected:", (response as GoogleAuthResponse)?.payload);
        setError(
          (response as GoogleAuthResponse)?.payload?.message ||
            "Authentication failed. Please try again."
        );
        setIsLoading(false);
      }
    } catch (error) {
      // Clear URL parameters on error too
      clearAuthParams();

      console.error("Error processing Google auth:", error);
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role: RoleType): Promise<HandleRoleSelectResult> => {
    setIsLoading(true);

    if (!state || !code || Array.isArray(state) || Array.isArray(code)) {
      throw new Error("Missing authentication parameters");
    }

    try {
      console.log("Selecting role:", role);
      // Define the expected response type
      type GoogleAuthResponse = User & {
        payload?: { message?: string };
        user_type?: string;
      };

      // Call your service to complete the signup with the selected role
      const response = (await updateUserMutation.mutateAsync({
        user_type: role,
      })) as GoogleAuthResponse;
      console.log("Role selection response:", response);

      // Check if user exists and has a role
      if (response) {
        setUserData((response as User) || null);

        // If user has a role, redirect to the appropriate dashboard
        const userType = response.user_type;

        if (userType) {
          console.log("User has role, redirecting to dashboard:", userType);
          // Clear the auth mode from localStorage
          localStorage.removeItem("googleAuthMode");
          localStorage.removeItem("oauth_code_timestamp");

          // Redirect based on user type
          router.push(userType === "SELLER" ? "/dashboard/seller" : "/dashboard");
          return {
            success: true,
            message: "Role selected successfully",
          };
        }

        // User exists but doesn't have a role, show role selection
        console.log("User exists but has no role, showing role selection");
        setIsLoading(false);
      } else {
        // Handle case where user doesn't exist or role selection failed

        console.error("Role update rejected:", (response as GoogleAuthResponse)?.payload);
        throw new Error(
          (response as GoogleAuthResponse)?.payload?.message ||
            "Failed to update role. Please try again."
        );
      }

      return {
        success: false,
        message: "Failed to update role",
      };
    } catch (error) {
      console.error("Error selecting role:", error);
      setError("Failed to update role. Please try again.");
      setIsLoading(false);

      return {
        success: false,
        message: "Failed to update role",
      };
    }
  };

  return {
    isLoading,
    error,
    showRoleSelection,
    userData,
    processGoogleAuth,
    handleRoleSelect,
    authAttempted,
    setAuthAttempted,
    setIsLoading,
  };
}
