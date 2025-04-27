"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/lib/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { debugOAuthFlow } from "@/lib/debug-auth";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { useEffect, useState } from "react";
import { loginSchema, handleZodError, handleAuthError } from "@/lib/validation/auth-validation";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [callbackInfo, setCallbackInfo] = useState<string | null>(null);

  // Store the callback URL in localStorage for later use
  localStorage.setItem("callbackUrl", callbackUrl || " ");

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
      const result = await login({ email, password });

      if (result && result.type && result.type.endsWith("/fulfilled")) {
        // Get the callback URL from the search params
        const searchParams = new URLSearchParams(window.location.search);
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

        // Redirect to the callback URL or dashboard by default
        window.location.href = decodeURI(callbackUrl);
        // Assuming the login was successful
        return { success: true };
      } else {
        // Handle API rejection errors
        const errorPayload = (result as any)?.payload;
        console.log(errorPayload);
        let errorMessage = "Login failed";

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
        }

        return {
          success: false,
          message: `${errorMessage} check email or password`,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: handleAuthError(error),
      };
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        {callbackInfo && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>OAuth Callback Issue</AlertTitle>
            <AlertDescription>{callbackInfo}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              submitButtonText="Login"
              footerText="Don't have an account?"
              footerLinkText="Sign up"
              footerLinkHref="/auth/signup"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
