// app/auth/google/GoogleAuthClient.tsx
"use client";

import { useEffect } from "react";
import { useGoogleAuth } from "@/lib/hooks/use-google-auth";
import LoadingState from "./loading";
import { ErrorState } from "./error-state";
import { RoleSelectionWrapper } from "./role-selection-wrapper";
import { useRouter } from "next/navigation";

interface Props {
  state?: string;
  code?: string;
}

export default function GoogleAuthClient({ state, code }: Props) {
  const router = useRouter();
  const {
    isLoading,
    error,
    showRoleSelection,
    userData,
    processGoogleAuth,
    handleRoleSelect,
    authAttempted,
    setIsLoading,
    setAuthAttempted,
  } = useGoogleAuth({ state: state ?? "", code: code ?? "" });

  useEffect(() => {
    setAuthAttempted(false);
    setIsLoading(true);
  }, [state, code]);

  // Now *try* auth only once per unique state/code:
  useEffect(() => {
    if (!authAttempted && state && code) {
      processGoogleAuth();
    } else if (!state || !code) {
      setIsLoading(false);
    }
  }, [state, code]);

  if (isLoading) {
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
