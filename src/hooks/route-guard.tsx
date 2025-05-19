"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useEffect } from "react";
import type { UserType } from "@/types/auth.types";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedUserType: UserType;
}

export function RouteGuard({ children, allowedUserType }: RouteGuardProps) {
  const router = useRouter();
  const { isLoading, userType, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && userType !== allowedUserType) {
      // Redirect to the appropriate dashboard based on user type
      const redirectPath = userType === "BUYER" ? "/dashboard/buyer" : "/dashboard/seller";
      router.replace(redirectPath);
    }
  }, [isLoading, isAuthenticated, userType, allowedUserType, router]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If user type matches allowed type, render the children
  if (userType === allowedUserType) {
    return children;
  }

  // Return null while redirecting
  return null;
}
