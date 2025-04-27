"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { FormErrors } from "@/components/auth/auth-form"

type SubmitHandler = (formData: FormData) => Promise<{
  success: boolean
  errors?: FormErrors
  message?: string
}>

export function useAuthForm(submitHandler: SubmitHandler) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    setGeneralError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitHandler(formData)

      if (!result.success) {
        if (result.errors) {
          setFormErrors(result.errors)
        }

        if (result.message) {
          setGeneralError(result.message)
        }
      } else {
        // Redirect or refresh page after successful submission
        router.refresh()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setGeneralError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    formErrors,
    generalError,
  }
}
