"use client";

import { useState, useEffect } from "react";
import { useGoogleAuth as googleAuth, useUpdateCurrentUser } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [userData, setUserData] = useState<User | {}>({});

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
        status: string;
        data: User;
      };

      // Call your service to authenticate with Google
      const response = (await googleMutation.mutateAsync({ state, code })) as GoogleAuthResponse;
      console.log("Google auth response:", response.data);

      // Clear URL parameters after processing to prevent reuse
      clearAuthParams();

      // Check if user exists and has a role
      if (response.status === "success") {
        setUserData((response.data as User) || null);

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
          router.push("/dashboard");
          return;
        }
      }

      setShowRoleSelection(true);
      setIsLoading(false);
    } catch (error) {
      // Clear URL parameters on error too
      clearAuthParams();

      console.error("Error processing Google auth:", error);
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    showRoleSelection,
    userData,
    processGoogleAuth,
    authAttempted,
    setAuthAttempted,
    setIsLoading,
  };
}
