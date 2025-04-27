"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGoogleAuthInitiate } from "@/lib/hooks/use-google-auth-initiate";
import { debugOAuthFlow } from "@/lib/debug-auth";

interface GoogleAuthButtonProps {
  mode: "login" | "signup";
  className?: string;
}

export function GoogleAuthButton({ mode, className }: GoogleAuthButtonProps) {
  const { isLoading, error, initiateGoogleAuth } = useGoogleAuthInitiate();
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      // Log debug info before initiating the flow
      debugOAuthFlow();

      // Check if we're getting redirected to login
      const currentUrl = window.location.href;
      setDebugInfo(`Starting OAuth flow from: ${currentUrl}`);

      // Initiate the Google auth flow
      await initiateGoogleAuth(mode);
    } catch (err) {
      console.error("Failed to initiate Google auth:", err);
      setDebugInfo(`Error initiating OAuth: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className={className}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
        )}
        {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
      </Button>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {debugInfo && (
        <div className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">
          <p className="font-semibold">Debug Info:</p>
          <p>{debugInfo}</p>
        </div>
      )}
    </div>
  );
}
