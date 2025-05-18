"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/providers/auth-context";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const { currentUser, userType, isLoading, logout } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <DashboardLayout userData={currentUser} userType={userType} logout={logout}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">
                {userType === "BUYER" ? "Total Purchases" : "Total Sales"}
              </h3>
            </div>
            <div className="text-2xl font-bold">
              {userType === "BUYER"
                ? currentUser?.purchases?.length || 0
                : currentUser?.sales?.length || 0}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">
                {userType === "BUYER" ? "Active Disputes" : "Store Status"}
              </h3>
            </div>
            <div className="text-2xl font-bold">
              {userType === "BUYER"
                ? currentUser?.disputes?.length || 0
                : currentUser?.store
                  ? "Active"
                  : "Not Set Up"}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium tracking-tight">Account Status</h3>
            </div>
            <div className="text-2xl font-bold">{currentUser?.verification_status}</div>
          </div>
        </div>

        {/* Additional dashboard content would go here */}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
