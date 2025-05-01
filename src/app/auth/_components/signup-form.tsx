"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { FormErrors } from "@/components/auth/auth-form";

interface SignupFormProps {
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    user_type: "BUYER" | "SELLER";
    email: string;
    password: string;
    re_password: string;
  }) => void;
  error?: string | null;
}

export function SignupForm({ onSubmit, error }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (error) {
      // Map the error message to the appropriate form field
      if (error.toLowerCase().includes("email")) {
        setFormErrors({ email: error });
      } else if (error.toLowerCase().includes("password")) {
        setFormErrors({ password: error });
      } else {
        // General error that doesn't map to a specific field
        setFormErrors({ general: error });
      }
    } else {
      setFormErrors({});
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const re_password = formData.get("confirmPassword") as string;

    // Submit form data to parent component
    onSubmit({
      first_name,
      last_name,
      email,
      password,
      re_password,
      user_type: "BUYER",
    });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="first_name"
        label="First Name"
        type="text"
        placeholder="Enter your first name"
        required
        autoComplete="first_name"
        state={formErrors.first_name ? "error" : "default"}
        helperText={formErrors.first_name}
      />
      <FormInput
        name="last_name"
        label="Last Name"
        type="text"
        placeholder="Enter your last name"
        required
        autoComplete="last_name"
        state={formErrors.last_name ? "error" : "default"}
        helperText={formErrors.last_name}
      />
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        autoComplete="email"
        state={formErrors.email ? "error" : "default"}
        helperText={formErrors.email}
      />
      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        required
        minLength={8}
        autoComplete="new-password"
        state={formErrors.password ? "error" : "default"}
        helperText={formErrors.password}
      />
      <FormInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        required
        autoComplete="new-password"
        state={formErrors.confirmPassword ? "error" : "default"}
        helperText={formErrors.confirmPassword}
      />
      {formErrors.general && (
        <p className="text-sm text-red-500">{formErrors.general}</p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Continue
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
