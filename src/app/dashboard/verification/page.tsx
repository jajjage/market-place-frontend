"use client";

import { useAuth } from "@/providers/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RouteGuard } from "@/hooks/route-guard";
import { CheckCircle2, XCircle, Mail, Phone, Shield } from "lucide-react";

export default function VerificationPage() {
  const { currentUser, userType, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) {
    return <LoadingSpinner />;
  }

  return <VerificationPageContent />;
}

function VerificationPageContent() {
  const { currentUser, userType, logout } = useAuth();

  const VerificationItem = ({
    title,
    description,
    isVerified,
    icon: Icon,
    verificationRoute,
  }: {
    title: string;
    description: string;
    isVerified: boolean;
    icon: any;
    verificationRoute: string;
  }) => (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <div className="rounded-full bg-gray-100 p-2">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {isVerified ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
          {!isVerified && (
            <Button
              className="mt-4"
              onClick={() => {
                // You will implement the verification process here
                console.log("Navigate to:", verificationRoute);
              }}
            >
              Verify Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout userData={currentUser} logout={logout}>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Account Verification</h1>
          <p className="text-gray-600">
            Complete the verification steps below to unlock all features and build trust with
            buyers.
          </p>
        </div>

        <div className="grid gap-6">
          <VerificationItem
            title="Email Verification"
            description="Verify your email address to receive important notifications and updates."
            isVerified={currentUser?.profile?.email_verified ?? false}
            icon={Mail}
            verificationRoute="/dashboard/seller/verification/email"
          />

          <VerificationItem
            title="Phone Verification"
            description="Add an extra layer of security by verifying your phone number."
            isVerified={currentUser?.profile?.phone_verified ?? false}
            icon={Phone}
            verificationRoute="/dashboard/seller/verification/phone"
          />

          <VerificationItem
            title="Identity Verification"
            description="Verify your identity to increase trust and unlock additional features."
            isVerified={currentUser?.profile?.identity_verified ?? false}
            icon={Shield}
            verificationRoute="/dashboard/seller/verification/identity"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
