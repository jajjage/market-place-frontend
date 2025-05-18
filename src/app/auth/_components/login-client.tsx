"use client";

import { useState, useEffect } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useLogin } from "@/hooks/use-auth"; // Adjust the import path
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { debugOAuthFlow } from "@/lib/debug-auth";
import { loginSchema, handleZodError } from "@/lib/validation/auth-validation";

export function LoginClient({ callbackUrl }: { callbackUrl?: string }) {
  const loginMutation = useLogin();
  const [callbackInfo, setCallbackInfo] = useState<string | null>(null);

  const loginFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      minLength: 6,
      autoComplete: "current-password",
    },
  ];

  useEffect(() => {
    // Add debugging for callback URL issues
    if (callbackUrl) {
      setCallbackInfo(`Received callback URL: ${callbackUrl}`);
      console.log("Callback URL detected:", callbackUrl);

      // Run debugging utility
      debugOAuthFlow();
    }
  }, [callbackUrl]);

  // Adapter to match AuthForm's onSubmit signature
  const handleLoginSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate form data with Zod
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      return {
        success: false,
        message: handleZodError(validationResult.error),
      };
    }

    // Proceed with login
    try {
      await loginMutation.mutateAsync({ email, password });

      // dispatch(setUser(user));

      // Get the callback URL from the search params
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get("callbackUrl") || "/dashboard";

      // Redirect to the callback URL or dashboard by default
      window.location.href = decodeURI(redirectUrl);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Login failed";
      const errorPayload = error.response?.data;

      if (errorPayload) {
        // Extract specific error messages from the API response
        if (errorPayload.non_field_errors) {
          errorMessage = errorPayload.non_field_errors[0];
        } else if (errorPayload.detail) {
          errorMessage = errorPayload.detail;
        } else if (errorPayload.email) {
          errorMessage = `Email: ${errorPayload.email[0]}`;
        } else if (errorPayload.password) {
          errorMessage = `Password: ${errorPayload.password[0]}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: `${errorMessage} check email or password`,
      };
    }
  };

  return (
    <>
      {callbackInfo && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>OAuth Callback Issue</AlertTitle>
          <AlertDescription>{callbackInfo}</AlertDescription>
        </Alert>
      )}

      <GoogleAuthButton mode="login" className="w-full" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <AuthForm
        type="login"
        fields={loginFields}
        onSubmit={handleLoginSubmit}
        submitButtonText={loginMutation.status === "pending" ? "Logging in..." : "Login"}
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/auth/signup"
        callbackUrl={callbackUrl}
      />
    </>
  );
}
