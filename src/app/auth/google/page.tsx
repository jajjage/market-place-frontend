"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleAuth } from "@/lib/hooks/use-google-auth";
import LoadingState from "../_components/loading";
import { ErrorState } from "../_components/error-state";
import { RoleSelectionWrapper } from "../_components/role-selection-wrapper";

export default function GoogleAuthPage() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const state = searchParam.get("state") || "";
  const code = searchParam.get("code") || "";
  const user_type = searchParam.get("user_type") || ""; // in progress

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
  } = useGoogleAuth({ state, code, router }); //# TODO ⚡ work in progress to add the userType if he use the buy link

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
