"use client";

interface ProfileFieldProps {
  label: string;
  value: string | number | boolean;
  type?: "text" | "boolean" | "date";
}

export function ProfileField({ label, value, type = "text" }: ProfileFieldProps) {
  const formatValue = () => {
    if (type === "boolean") {
      return value ? "Yes" : "No";
    }
    if (type === "date" && value) {
      return new Date(value as string).toLocaleDateString();
    }
    return value;
  };

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <p className="mt-1 text-lg">{formatValue()}</p>
    </div>
  );
}
