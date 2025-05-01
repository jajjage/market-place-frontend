"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getCurrentUser } from "@/lib/redux/features/auth/authSlice";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (s) =>
      s.auth ?? {
        isAuthenticated: false,
        authChecked: false,
      }
  );

  // Initial auth check on mount
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};
