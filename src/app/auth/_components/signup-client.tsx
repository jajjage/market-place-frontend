"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { SignupForm } from "@/components/auth/signup-form";
import { useRegister, useLogin } from "@/hooks/use-auth"; // Adjust the import path
import { signupDetailsSchema, handleZodError } from "@/lib/validation/auth-validation";

export function SignupClient() {
  const router = useRouter();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleDetailsSubmit = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    re_password: string;
  }) => {
    // Validate with Zod
    const validationResult = signupDetailsSchema.safeParse(data);

    if (!validationResult.success) {
      setErrorMessage(handleZodError(validationResult.error));
      console.log(errorMessage);
      return;
    }
    try {
      await registerMutation.mutateAsync(data);
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
      setIsSubmitting(false);
      setErrorMessage(null);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Registration failed";
      if (error.response?.data) {
        const errorPayload = error.response.data;
        if (errorPayload.email) {
          errorMessage = `Email: ${Array.isArray(errorPayload.email) ? errorPayload.email[0] : errorPayload.email}`;
        } else if (errorPayload.password) {
          errorMessage = `Password: ${Array.isArray(errorPayload.password) ? errorPayload.password[0] : errorPayload.password}`;
        } else if (errorPayload.non_field_errors) {
          errorMessage = Array.isArray(errorPayload.non_field_errors)
            ? errorPayload.non_field_errors[0]
            : errorPayload.non_field_errors;
        } else if (typeof errorPayload === "string") {
          errorMessage = errorPayload;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setErrorMessage(errorMessage);
      setIsSubmitting(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <GoogleAuthButton mode="signup" className="w-full" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <SignupForm
          onSubmit={handleDetailsSubmit}
          error={errorMessage}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </>
  );
}
