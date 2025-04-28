// app/auth/signup/_components/signup-client.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { SignupForm } from "@/app/auth/_components/signup-form";
import { RoleSelection } from "@/components/auth/role-selection";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  signupDetailsSchema,
  completeSignupSchema,
  handleZodError,
  handleAuthError,
} from "@/lib/validation/auth-validation";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface user_type {
  role: "BUYER" | "SELLER";
}

export function SignupClient() {
  const router = useRouter();
  const { register } = useAuth();
  const [step, setStep] = useState<"details" | "role">("details");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    re_password: string;
    role?: user_type["role"];
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleDetailsSubmit = (data: {
    first_name: string;
    last_name: string;
    user_type?: user_type["role"];
    email: string;
    password: string;
    re_password: string;
  }) => {
    // Validate with Zod
    const validationResult = signupDetailsSchema.safeParse(data);

    if (!validationResult.success) {
      setErrorMessage(handleZodError(validationResult.error));
      return;
    }

    setErrorMessage(null);
    setFormData({ ...formData, ...data });
    setStep("role");
  };

  const handleRoleSelect = async (role: user_type["role"]) => {
    const completeFormData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      re_password: formData.re_password,
      user_type: role,
    };

    // Validate complete form with Zod
    const validationResult = completeSignupSchema.safeParse(completeFormData);

    if (!validationResult.success) {
      setErrorMessage(handleZodError(validationResult.error));
      return { success: false };
    }

    try {
      const result = await register(completeFormData);

      if (result && result.type && result.type.endsWith("/fulfilled")) {
        router.push("/dashboard");
        return { success: true };
      } else {
        // Handle API rejection errors
        const errorPayload = (result as any)?.payload;
        let errorMessage = "Registration failed";

        if (errorPayload) {
          // Check for specific error fields
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
        }

        setErrorMessage(errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error: any) {
      const errorMsg = handleAuthError(error);
      setErrorMessage(errorMsg);
      return {
        success: false,
        message: errorMsg,
      };
    }
  };

  return (
    <>
      {errorMessage && step === "role" && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {step === "details" ? (
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

          <SignupForm onSubmit={handleDetailsSubmit} />
        </div>
      ) : (
        <>
          <CardHeader className="px-0 pt-0">
            <CardTitle>Choose your role</CardTitle>
            <CardDescription>Select how you'll be using our platform</CardDescription>
          </CardHeader>
          <RoleSelection onSelectRole={handleRoleSelect} />
        </>
      )}
    </>
  );
}
