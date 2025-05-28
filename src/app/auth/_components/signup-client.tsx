"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { SignupForm } from "@/components/auth/signup-form";
import { useRegister, useLogin } from "@/hooks/use-auth"; // Adjust the import path
import { signupDetailsSchema, handleZodError } from "@/lib/validation/auth-validation";
import { AuthForm } from "@/components/auth/auth-form";

export function SignupClient() {
  const router = useRouter();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleDetailsSubmit = async (formData: FormData) => {
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      re_password: formData.get("re_password") as string,
    };

    // Validate with Zod
    const validationResult = signupDetailsSchema.safeParse(data);

    if (!validationResult.success) {
      setErrorMessage(handleZodError(validationResult.error));
      console.log(errorMessage);
      return { success: false, message: handleZodError(validationResult.error) };
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
      <div className="space-y-4">
        <GoogleAuthButton mode="signup" className="w-full" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center p-2 text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <AuthForm
          type="signup"
          fields={[
            { name: "first_name", label: "First Name", type: "text", required: true },
            { name: "last_name", label: "Last Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "password", label: "Password", type: "password", required: true },
            { name: "re_password", label: "Confirm Password", type: "password", required: true },
          ]}
          onSubmit={handleDetailsSubmit}
          submitButtonText={
            registerMutation.status === "pending" || loginMutation.status === "pending"
              ? "Signing Up..."
              : "Sign Up"
          }
          footerText="Already have an account?"
          footerLinkText="Login"
          footerLinkHref="/auth/login"
        />
      </div>
    </>
  );
}
