"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/store";
import { useCurrentUser } from "@/lib/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackUrl?: string;
  loadingComponent?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  fallbackUrl = "/auth/login",
  loadingComponent = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // We'll use useCurrentUser with enabled=false so we can manually trigger refetch
  const { isLoading, refetch } = useCurrentUser({ enabled: false });

  // Check auth status when component mounts or auth state changes
  useEffect(() => {
    const verifyAuth = async () => {
      // If Redux says we're not authenticated, redirect immediately
      if (!isAuthenticated) {
        const callbackUrl = encodeURIComponent(window.location.pathname);
        router.push(`${fallbackUrl}?callbackUrl=${callbackUrl}`);
        return;
      }

      // If Redux says we're authenticated, double-check with the API
      try {
        await refetch();
        // If we get here, the user is authenticated
      } catch (error: any) {
        // If API verification fails, redirect to login
        if (error?.status === 401) {
          const callbackUrl = encodeURIComponent(window.location.pathname);
          router.push(`${fallbackUrl}?callbackUrl=${callbackUrl}`);
        }
      }
    };

    verifyAuth();
  }, [isAuthenticated, refetch, router, fallbackUrl]);

  // Show loading state initially
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Only render children if authenticated according to Redux
  return isAuthenticated ? <>{children}</> : <>{loadingComponent}</>;
}
