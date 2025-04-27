"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { debugOAuthFlow } from "@/lib/debug-auth";
import { useEffect, useState } from "react";
import userService from "@/services/auth-service";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  const [errorMessage, setErrorMessage] = useState<string | null>(
    error === "auth_failed"
      ? "Authentication failed. Please try again."
      : error === "callback_failed"
        ? "There was a problem processing your password reset. Please try again."
        : null
  );

  const [callbackInfo, setCallbackInfo] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [email, setEmail] = useState("");

  const resetFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      autoComplete: "email",
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Adapter to match AuthForm's onSubmit signature
  const handleLoginSubmit = async (formData: FormData) => {
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);

    const credentials = {
      email: emailValue || "",
    };

    try {
      await userService.resetPassword(credentials);
      setEmailSent(true);
      setCooldown(30); // 30 seconds cooldown
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "Reset failed",
      };
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await userService.resetPassword({ email });
      setEmailSent(true);
      setCooldown(30); // Reset cooldown
    } catch (error: any) {
      setErrorMessage(error?.message || "Failed to resend email");
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {callbackInfo && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>OAuth Callback Issue</AlertTitle>
            <AlertDescription>{callbackInfo}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailSent ? (
              <div className="space-y-4">
                <Alert variant="default" className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-700">Email Sent</AlertTitle>
                  <AlertDescription className="text-green-600">
                    Please check your inbox for the password reset link. If you don't see it, check
                    your spam folder.
                  </AlertDescription>
                </Alert>

                <div className="mt-4 text-center">
                  <p className="mb-2 text-sm text-gray-500">Didn't receive the email?</p>
                  <Button
                    onClick={handleResend}
                    disabled={cooldown > 0}
                    variant="outline"
                    className="mt-2"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Email"}
                  </Button>
                </div>
              </div>
            ) : (
              <AuthForm
                type="password-reset"
                fields={resetFields}
                onSubmit={handleLoginSubmit}
                title="Password Reset"
                submitButtonText="Send Reset Link"
                footerText="Do you remember the password?"
                footerLinkText="Login"
                footerLinkHref="/auth/login"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
