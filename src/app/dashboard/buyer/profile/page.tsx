"use client";

import { useAuth } from "@/providers/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function BuyerProfilePage() {
  const { currentUser, userType, isLoading, logout } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout userData={currentUser} userType={userType} logout={logout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-lg">{`${currentUser?.first_name} ${currentUser?.last_name}`}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-lg">{currentUser?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">User Type</label>
                <p className="text-lg">{userType}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Verification Status</label>
                <p className="text-lg">{currentUser?.verification_status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
