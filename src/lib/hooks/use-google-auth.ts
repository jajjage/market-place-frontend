import { useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";

interface HandleRoleSelectResult {
  success: boolean;
  message: string;
}

type RoleType = "SELLER" | "BUYER";

interface RouterType {
  push: (path: string) => void;
}

interface UseGoogleAuthParams {
  state: string;
  code: string;
  router: RouterType;
}

export function useGoogleAuth({ state, code, router }: UseGoogleAuthParams) {
  const { googleAuth, updateUserRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [userData, setUserData] = useState(null);

  // Get the auth mode from localStorage (login or signup)
  const authMode =
    typeof window !== "undefined" ? localStorage.getItem("googleAuthMode") || "signup" : "signup";

  const processGoogleAuth = async () => {
    // Skip if we've already attempted auth or parameters aren't available
    if (authAttempted || !state || !code || Array.isArray(state) || Array.isArray(code)) {
      !authAttempted && setError("Missing or invalid authentication parameters");
      setIsLoading(false);
      return;
    }
    //work in progress to add the userType if he use the buy link
    // # TODO ⚡Implementing a flow to extract userType if he use a Buy link to bypass the role choice component
    // Mark that we've attempted authentication
    setAuthAttempted(true);

    try {
      console.log("Processing Google auth with mode:", authMode);

      // Call your service to authenticate with Google
      const response = await googleAuth(state, code);
      console.log("Google auth response:", response);

      // Check if user exists and has a role
      if (response.meta.requestStatus === "fulfilled") {
        setUserData((response.payload as { data: typeof userData }).data);

        // If user has a role, redirect to the appropriate dashboard
        const payload = response.payload as { user_type?: string };
        const userType = payload.user_type;

        console.log("User payload user_type:", userType);

        if (userType) {
          console.log("User has role, redirecting to dashboard:", userType);
          // Clear the auth mode from localStorage
          localStorage.removeItem("googleAuthMode");
          const callbackUrl = localStorage.getItem("callbackUrl");

          if (callbackUrl) {
            console.log("Redirecting to callback URL:", callbackUrl);
            window.location.href = callbackUrl;
            localStorage.removeItem("callbackUrl"); // Clean up after use
            return;
          } else {
            // Redirect to the dashboard
            router.push(userType === "SELLER" ? "/dashboard/seller" : "/dashboard");
            return;
          }
        }

        setShowRoleSelection(true);
        setIsLoading(false);
      } else {
        console.error("Authentication rejected:", response.payload);
        setError(response.payload?.message || "Authentication failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error processing Google auth:", error);
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role: RoleType): Promise<HandleRoleSelectResult> => {
    setIsLoading(true);

    if (!state || !code || Array.isArray(state) || Array.isArray(code)) {
      throw new Error("Missing authentication parameters");
    }

    try {
      console.log("Selecting role:", role);

      // Call your service to complete the signup with the selected role
      const response = await updateUserRole(role);
      console.log("Role selection response:", response);

      // Check if user exists and has a role
      if (response.meta.requestStatus === "fulfilled") {
        setUserData((response.payload as { data: typeof userData }).data);

        // If user has a role, redirect to the appropriate dashboard
        const payload = response.payload as { user_type?: string };
        const userType = payload.user_type;

        if (userType) {
          console.log("User has role, redirecting to dashboard:", userType);
          // Clear the auth mode from localStorage
          localStorage.removeItem("googleAuthMode");

          // Redirect based on user type
          router.push(userType === "SELLER" ? "/dashboard/seller" : "/dashboard");
          return {
            success: true,
            message: "Role selected successfully",
          };
        }

        // User exists but doesn't have a role, show role selection
        console.log("User exists but has no role, showing role selection");
        setIsLoading(false);
      } else {
        console.error("Role update rejected:", response.payload);
        throw new Error(
          response.payload && typeof response.payload === "object" && "message" in response.payload
            ? (response.payload as { message: string }).message
            : "Failed to update role"
        );
      }

      return {
        success: false,
        message: "Failed to update role",
      };
    } catch (error) {
      console.error("Error selecting role:", error);
      setError("Failed to update role. Please try again.");
      setIsLoading(false);

      return {
        success: false,
        message: "Failed to update role",
      };
    }
  };

  return {
    isLoading,
    error,
    showRoleSelection,
    userData,
    processGoogleAuth,
    handleRoleSelect,
    authAttempted,
    setAuthAttempted,
    setIsLoading,
  };
}
