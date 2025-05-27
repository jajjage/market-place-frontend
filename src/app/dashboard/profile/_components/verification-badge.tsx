"use client";

import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface VerificationBadgeProps {
  user: User;
}

export const VerificationBadge = ({ user }: VerificationBadgeProps) => {
  const router = useRouter();

  const isFullyVerified =
    user.profile.email_verified && user.profile.phone_verified && user.profile.identity_verified;

  if (isFullyVerified) {
    return null;
  }

  const getUnverifiedItems = () => {
    const items = [];
    if (!user.profile.email_verified) items.push("email");
    if (!user.profile.phone_verified) items.push("phone");
    if (!user.profile.identity_verified) items.push("identity");
    return items;
  };

  const unverifiedItems = getUnverifiedItems();

  return (
    <div className="diagonal-lines-subtle mb-6 w-full rounded-lg border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.98)] p-4">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-[rgb(143,242,93)]" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-[rgb(143,242,93)]">Verification Required</h3>
          <p className="mt-1 text-sm text-gray-300">
            Please verify your {unverifiedItems.join(", ")} to unlock all features and build trust
            with buyers.
          </p>
          <button onClick={() => router.push("/dashboard/verification")} className="mt-3">
            Complete Verification
          </button>
        </div>
      </div>
    </div>
  );
};
