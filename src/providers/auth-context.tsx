"use client";

import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { useAppSelector } from "@/lib/redux/store";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

// Define types
type UserType = "BUYER" | "SELLER";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: User | undefined;
  userType: UserType;
  userError: any | null;
  logout: () => void;
}

const USER_TYPES = {
  BUYER: "BUYER" as UserType,
  SELLER: "SELLER" as UserType,
};

// Create Authentication Context with proper typing
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthBootstrapProvider({ children }: { children: React.ReactNode }) {
  // 1) Check local storage for authentication status
  const [storageChecked, setStorageChecked] = useState(false);
  const [isAuthFromStorage, setIsAuthFromStorage] = useState(false);

  useEffect(() => {
    // This only runs on client
    const val = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthFromStorage(val);
    setStorageChecked(true);
  }, []);

  const logout = useLogout();

  // 2) Enable the query only after checking storage
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    status,
  } = useCurrentUser({
    enabled: storageChecked && isAuthFromStorage,
  });

  // 3) Pull Redux state too
  const { isAuthenticated, user: reduxUser } = useAppSelector((s) => s.auth);

  // Combine data sources to get current user
  const currentUser = reduxUser || userData;
  const userType = (currentUser?.user_type as UserType) || USER_TYPES.BUYER;

  // Loading state while checking authentication
  const isLoading = !storageChecked || status === "pending";

  // Determine if authentication is valid
  const isValid = isAuthenticated || (!!currentUser && !userError);

  // Create context value with all auth-related data and functions
  const authContextValue = {
    isLoading,
    isAuthenticated: isValid,
    currentUser,
    userType,
    userError,
    logout: logout.mutate,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
