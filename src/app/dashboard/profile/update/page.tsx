"use client";

import { useAuth } from "@/providers/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { UpdateForm } from "../_components/update-form";
import { useUpdateCurrentUser } from "@/hooks/use-auth";
import { UserProfile } from "@/types/user";
import { RouteGuard } from "@/hooks/route-guard";

export default function UpdateProfilePage() {
  const { currentUser, userType, isLoading, logout } = useAuth();
  const { isError, isPending, mutate: updateProfile } = useUpdateCurrentUser();

  if (isPending || !currentUser) {
    return <LoadingSpinner />;
  }

  const handleUpdateProfile = async (formData: Partial<UserProfile>) => {
    updateProfile(formData);
  };

  return (
    <DashboardLayout userData={currentUser} logout={logout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Update Profile</h1>
        </div>

        <UpdateForm profile={currentUser.profile || {}} onSubmit={handleUpdateProfile} />
      </div>
    </DashboardLayout>
  );
}
