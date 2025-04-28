// app/auth/google/GoogleAuthClient.tsx
"use client";

import { useEffect } from "react";
import { useGoogleAuth } from "@/lib/hooks/use-google-auth";
import LoadingState from "./loading";
import { ErrorState } from "./error-state";
import { RoleSelectionWrapper } from "./role-selection-wrapper";

interface Props {
  state?: string;
  code?: string;
}

export default function GoogleAuthClient({ state, code }: Props) {
  const {
    isLoading,
    error,
    showRoleSelection,
    userData,
    processGoogleAuth,
    handleRoleSelect,
    authAttempted,
    setIsLoading,
  } = useGoogleAuth({ state: state ?? "", code: code ?? "" });

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || authAttempted) {
      return;
    }

    // Prevent rapid auth attempts
    const lastAuthTime = localStorage.getItem("last_auth_time");
    const currentTime = Date.now();

    if (lastAuthTime && currentTime - parseInt(lastAuthTime) < 3000) {
      console.log("Preventing rapid auth attempts");
      return;
    }

    localStorage.setItem("last_auth_time", currentTime.toString());

    // Only process if we have code and state
    if (code && state) {
      processGoogleAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log("Current state:", { isLoading, error, showRoleSelection });

  if (isLoading) {
    console.log("Rendering loading state");
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (showRoleSelection) {
    return <RoleSelectionWrapper userData={userData ?? {}} onSelectRole={handleRoleSelect} />;
  }

  return null;
}
