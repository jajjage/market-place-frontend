"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { ReactElement } from "react";

interface ProfileFieldProps {
  label: string;
  value: ReactElement | string | boolean | null;
  type?: "text" | "boolean" | "date";
}

export function ProfileField({ label, value, type = "text" }: ProfileFieldProps) {
  let displayValue = value;

  if (
    type === "date" &&
    value &&
    (typeof value === "string" || typeof value === "number" || value instanceof Date)
  ) {
    try {
      displayValue = new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      displayValue = value;
    }
  } else if (type === "boolean") {
    displayValue = value === true ? <CheckIcon /> : <XIcon />;
  }
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="mt-1 flex items-center font-medium text-gray-800">{displayValue}</div>
    </div>
  );
}
