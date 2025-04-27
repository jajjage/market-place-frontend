// auth-validation.ts
import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Signup details base schema (object only, no refine)
const signupDetailsBaseSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  re_password: z.string().min(1, { message: "Please confirm your password" }),
});

// Signup details schema with password match refine
export const signupDetailsSchema = signupDetailsBaseSchema.refine(
  (data) => data.password === data.re_password,
  {
    message: "Passwords do not match",
    path: ["re_password"],
  }
);

// Complete signup schema with role
export const completeSignupSchema = signupDetailsBaseSchema
  .extend({
    user_type: z.enum(["BUYER", "SELLER"], {
      required_error: "Please select a role",
      invalid_type_error: "Role must be either BUYER or SELLER",
    }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

// Reset password schema
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

// Confirm password reset schema
export const confirmPasswordResetSchema = z
  .object({
    uid: z.string().min(1, { message: "User ID is required" }),
    token: z.string().min(1, { message: "Token is required" }),
    new_password: z
      .string()
      .min(1, { message: "New password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    re_new_password: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.new_password === data.re_new_password, {
    message: "Passwords do not match",
    path: ["re_new_password"],
  });

// Error handling utility
export function handleZodError(error: z.ZodError) {
  const formattedErrors = error.format();

  // Extract first error message
  const firstError = Object.values(formattedErrors).find(
    (field) =>
      field &&
      typeof field === "object" &&
      "_errors" in field &&
      Array.isArray((field as { _errors?: unknown })._errors) &&
      (field as { _errors: unknown[] })._errors.length > 0
  );

  return firstError && "_errors" in firstError
    ? (firstError as { _errors: string[] })._errors[0]
    : "Validation failed";
}

// Authentication error handler
export function handleAuthError(error: any) {
  // Handle API-specific errors
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        // Handle validation errors from API
        if (data.email) return `Email: ${data.email[0]}`;
        if (data.password) return `Password: ${data.password[0]}`;
        if (data.non_field_errors) return data.non_field_errors[0];
        return "Invalid request. Please check your information.";

      case 401:
        return "Invalid credentials. Please check your email and password.";

      case 403:
        return "Your account is disabled or you don't have permission to access this resource.";

      case 404:
        return "Account not found. Please check your email or sign up.";

      case 429:
        return "Too many attempts. Please try again later.";

      default:
        return data.detail || "Authentication failed. Please try again.";
    }
  }

  // Handle network errors
  if (error.request) {
    return "Network error. Please check your connection and try again.";
  }

  // Handle other errors
  return error.message || "An unexpected error occurred.";
}
