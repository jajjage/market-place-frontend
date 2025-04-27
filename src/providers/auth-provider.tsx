"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getCurrentUser } from "@/lib/redux/features/auth/authSlice";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, authChecked } = useAppSelector(
    (s) =>
      s.auth ?? {
        isAuthenticated: false,
        authChecked: false,
      }
  );
  const [authCheckAttempted, setAuthCheckAttempted] = useState(false);

  useEffect(() => {
    // Only check auth status once on initial mount
    if (!authChecked && !authCheckAttempted) {
      setAuthCheckAttempted(true);
      dispatch(getCurrentUser());
    }
  }, [dispatch, authChecked, authCheckAttempted]);

  return <>{children}</>;
};
