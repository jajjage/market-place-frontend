"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, ShoppingBag, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormErrors } from "@/components/auth/auth-form";

interface RoleSelectionProps {
  onSelectRole: (role: "BUYER" | "SELLER") => Promise<{
    success: boolean;
    errors?: FormErrors;
    message?: string;
  }>;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<"BUYER" | "SELLER" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError("Please select a role to continue");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onSelectRole(selectedRole);

      if (!result.success) {
        setError(result.message || "An error occurred during signup");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RoleCard
          title="I'm a buyer"
          description="I'm looking to purchase products or services"
          icon={<ShoppingBag className="h-10 w-10" />}
          selected={selectedRole === "BUYER"}
          onClick={() => setSelectedRole("BUYER")}
        />
        <RoleCard
          title="I'm a seller"
          description="I want to sell my products or services"
          icon={<Briefcase className="h-10 w-10" />}
          selected={selectedRole === "SELLER"}
          onClick={() => setSelectedRole("SELLER")}
        />
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      <Button onClick={handleSubmit} className="w-full" disabled={!selectedRole || isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ title, description, icon, selected, onClick }: RoleCardProps) {
  return (
    <Card
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center p-6 text-center transition-all hover:border-primary",
        selected && "border-2 border-primary bg-primary/5"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "mb-4 rounded-full p-2",
          selected ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
