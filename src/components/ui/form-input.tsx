"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"

export type InputState = "default" | "error" | "success" | "loading"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  state?: InputState
  hideLabel?: boolean
}

export function FormInput({
  label,
  helperText,
  state = "default",
  hideLabel = false,
  className,
  id,
  type = "text",
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substring(2, 9)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId} className={cn(hideLabel && "sr-only")}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={inputId}
          type={inputType}
          className={cn(
            isPassword && "pr-10",
            state === "error" && "border-destructive focus-visible:ring-destructive",
            state === "success" && "border-green-500 focus-visible:ring-green-500",
            className,
          )}
          aria-invalid={state === "error"}
          aria-describedby={helperText ? `${inputId}-description` : undefined}
          disabled={state === "loading" || props.disabled}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </button>
        )}

        {state === "error" && (
          <AlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive"
            aria-hidden="true"
          />
        )}

        {state === "success" && (
          <CheckCircle2
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
            aria-hidden="true"
          />
        )}
      </div>

      {helperText && (
        <p
          id={`${inputId}-description`}
          className={cn(
            "text-sm",
            state === "error" ? "text-destructive" : "text-muted-foreground",
            state === "success" && "text-green-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
