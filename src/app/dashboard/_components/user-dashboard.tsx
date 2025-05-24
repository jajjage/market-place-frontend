"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/providers/auth-context";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import SetUpStoreCTA from "@/components/dashboard/setup-store";

const UserDashboard = () => {
  const { currentUser, isLoading, logout } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <DashboardLayout userData={currentUser} logout={logout}>
      <div className="space-y-4">
        {!currentUser?.store && currentUser?.verification_status === "Verified" && (
          <SetUpStoreCTA isVerified={true} />
        )}
        {!currentUser?.store && currentUser?.verification_status !== "Verified" && (
          <SetUpStoreCTA isVerified={false} />
        )}

        {currentUser?.verification_status === "Unverified" && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Account not verified</p>
                <p className="text-sm text-yellow-700">
                  Complete your verification to unlock all seller features.{" "}
                  <a href="/dashboard/seller/verification" className="font-medium underline">
                    Verify now
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Total Transactions</h3>
            </div>
            <div className="text-2xl font-bold">
              {(currentUser?.purchases?.length || 0) + (currentUser?.sales?.length || 0)}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Active Disputes</h3>
            </div>
            <div className="text-2xl font-bold">{currentUser?.disputes?.length || 0}</div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Account Status</h3>
            </div>
            <div className="text-2xl font-bold">
              {currentUser?.profile.verified_status || "Unverified"}
            </div>
          </div>
        </div>

        {/* Additional dashboard content would go here */}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
