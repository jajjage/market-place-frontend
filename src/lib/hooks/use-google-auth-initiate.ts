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

  const initiateGoogleAuth = useCallback(async (mode: "login" | "signup") => {
    setState({ isLoading: true, error: null });

    try {
      // 1) Save mode
      localStorage.setItem("googleAuthMode", mode);

      // 4) Compute your redirect URI for Google→your callback page
      const redirectUri =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_REDIRECT_URI!
          : "http://localhost:3000/auth/google/";

      // 5) Hit your Django endpoint, passing both redirect_uri & state
      const response = await api.get("auth/o/google-oauth2/", {
        params: {
          redirect_uri: redirectUri,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to start Google auth");
      }

      // 6) The URL Django sends you already has `&state=<your-blob>` in it
      const authUrl: string = response.data.authorization_url;
      if (!authUrl) throw new Error("No authorization_url returned");

      // 7) Finally—redirect the browser into Google’s flow
      window.location.href = authUrl;
    } catch (err: any) {
      console.error("initiateGoogleAuth error:", err);
      setState({
        isLoading: false,
        error: err.message || "An unexpected error occurred",
      });
    }
  }, []);

  return {
    ...state,
    initiateGoogleAuth,
  };
}
