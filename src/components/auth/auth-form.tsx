"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput, type InputState } from "@/components/ui/form-input";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export type FieldConfig = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
};

export type FormErrors = Record<string, string>;

export type AuthFormProps = {
  type: "login" | "signup" | "password-reset" | "password-set" | "password-reset-confirm";
  title?: string;
  description?: string;
  fields: FieldConfig[];
  onSubmit: (
    formData: FormData
  ) => Promise<{ success: boolean; errors?: FormErrors; message?: string }>;
  submitButtonText?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
};

export function AuthForm({
  type,
  title,
  description,
  fields,
  onSubmit,
  submitButtonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  className,
}: AuthFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<Record<string, InputState>>({});

  // Default values based on form type
  const defaultTitle = type === "login" ? "Log In" : "Sign Up";
  const defaultSubmitText = type === "login" ? "Log In" : "Create Account";
  const defaultFooterText =
    type === "login" ? "Don't have an account?" : "Already have an account?";
  const defaultFooterLink = type === "login" ? "Sign Up" : "Log In";
  const defaultFooterHref = type === "login" ? "/signup" : "/login";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setGeneralError(null);

    // Update all field states to loading
    const loadingStates = fields.reduce(
      (acc, field) => {
        acc[field.name] = "loading";
        return acc;
      },
      {} as Record<string, InputState>
    );
    setFieldStates(loadingStates);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await onSubmit(formData);

      if (!result.success) {
        if (result.errors) {
          setFormErrors(result.errors);

          // Update field states based on errors
          const newFieldStates = { ...loadingStates };
          Object.keys(result.errors).forEach((field) => {
            newFieldStates[field] = "error";
          });

          // Set fields without errors to default state
          fields.forEach((field) => {
            if (!result.errors?.[field.name]) {
              newFieldStates[field.name] = "default";
            }
          });

          setFieldStates(newFieldStates);
        }

        if (result.message) {
          setGeneralError(result.message);
        }
      } else {
        // Set all fields to success state
        const successStates = fields.reduce(
          (acc, field) => {
            acc[field.name] = "success";
            return acc;
          },
          {} as Record<string, InputState>
        );
        setFieldStates(successStates);

        // Redirect or refresh page after successful submission
        router.refresh();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setGeneralError("An unexpected error occurred. Please try again.");

      // Reset field states to default
      const defaultStates = fields.reduce(
        (acc, field) => {
          acc[field.name] = "default";
          return acc;
        },
        {} as Record<string, InputState>
      );
      setFieldStates(defaultStates);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || defaultTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              minLength={field.minLength}
              pattern={field.pattern}
              autoComplete={field.autoComplete}
              state={fieldStates[field.name] || "default"}
              helperText={formErrors[field.name]}
              disabled={isSubmitting}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitButtonText || defaultSubmitText}
          </Button>

          {type === "login" && (
            <div className="text-center">
              <Link
                href="/auth/password-reset"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {(footerText || footerLinkText) && (
            <p className="text-center text-sm text-muted-foreground">
              {footerText || defaultFooterText}{" "}
              {footerLinkText && (
                <Link
                  href={footerLinkHref || defaultFooterHref}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {footerLinkText || defaultFooterLink}
                </Link>
              )}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
