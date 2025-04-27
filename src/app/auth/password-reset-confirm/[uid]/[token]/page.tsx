"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import userService from "@/services/auth-service";
import React from "react";
import { passwordResetSchema } from "../../_components/schema";

// Fixed props interface to work with React.use()
interface PasswordResetConfirmProps {
  params: Promise<{ uid: string; token: string }> | { uid: string; token: string };
}

export default function PasswordResetConfirmPage({ params }: PasswordResetConfirmProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unwrapped, setUnwrapped] = useState<{ uid: string; token: string } | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Properly unwrap params using React.use()
  useEffect(() => {
    let cancelled = false;
    Promise.resolve(params)
      .then((p) => {
        if (!cancelled) setUnwrapped(p);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setErrorMessage("Failed to read reset link.");
      });
    return () => {
      cancelled = true;
    };
  }, [params]);

  // While we’re waiting for the promise → show a loading state
  if (!unwrapped) {
    return <div>Loading…</div>;
  }

  const { uid, token } = unwrapped;

  const passwordResetFields = [
    {
      name: "new_password",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
      required: true,
      autoComplete: "new-password",
    },
    {
      name: "re_new_password",
      label: "Confirm New Password",
      type: "password",
      placeholder: "Confirm your new password",
      required: true,
      autoComplete: "new-password",
    },
  ];

  const handleResetConfirmSubmit = async (formData: FormData) => {
    const new_password = formData.get("new_password") as string;
    const re_new_password = formData.get("re_new_password") as string;

    // Zod validation
    const validationResult = passwordResetSchema.safeParse({
      new_password,
      re_new_password,
    });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();

      // Get the first error message
      const errorMessage =
        formattedErrors.new_password?._errors[0] ||
        formattedErrors.re_new_password?._errors[0] ||
        "Invalid password";

      return {
        success: false,
        message: errorMessage,
      };
    }

    try {
      await userService.resetPasswordConfirm({
        uid,
        token,
        new_password,
        re_new_password,
      });

      setResetSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "Password reset failed",
      };
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

        {resetSuccess ? (
          <Alert variant="default" className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Password Reset Successful</AlertTitle>
            <AlertDescription className="text-green-600">
              Your password has been successfully reset. You will be redirected to the login page
              shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Set New Password</CardTitle>
              <CardDescription>Please enter and confirm your new password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AuthForm
                type="password-reset-confirm"
                fields={passwordResetFields}
                onSubmit={handleResetConfirmSubmit}
                title="Reset Password"
                submitButtonText="Reset Password"
                footerText="Remember your password?"
                footerLinkText="Login"
                footerLinkHref="/auth/login"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
