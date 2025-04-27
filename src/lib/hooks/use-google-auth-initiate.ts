"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";

interface GoogleAuthState {
  isLoading: boolean;
  error: string | null;
}

export function useGoogleAuthInitiate() {
  const [state, setState] = useState<GoogleAuthState>({
    isLoading: false,
    error: null,
  });

  // This function will initiate the Google OAuth flow
  const initiateGoogleAuth = useCallback(async (mode: "login" | "signup") => {
    setState({ isLoading: true, error: null });

    try {
      console.log("Initiating Google OAuth flow with mode:", mode);

      // Store the mode (login/signup) in localStorage
      localStorage.setItem("googleAuthMode", mode);

      // Get the redirect URI
      const redirectUri =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/auth/google"
          : "http://localhost:3000/auth/google";

      console.log("Using redirect URI:", redirectUri);

      // Make the API call to get the authorization URL
      const response = await api.get(
        `auth/o/google-oauth2/?redirect_uri=${encodeURIComponent(redirectUri)}/`
      );

      console.log("API Response status:", response.status);

      // Check for errors in the response
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to initiate Google authentication");
      }

      // Get the authorization URL from the response
      const authUrl = response.data.authorization_url;
      console.log("Redirecting to auth URL:", authUrl);

      if (!authUrl) {
        throw new Error("No authorization URL returned from the server");
      }

      // Redirect to Google's authorization URL
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google auth error:", error);
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  }, []);

  return {
    ...state,
    initiateGoogleAuth,
  };
}
