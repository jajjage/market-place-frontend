"use client";

import { useAuth } from "@/providers/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ProfileSection } from "./_components/profile-section";
import { ProfileField } from "./_components/profile-field";
import { ProfileActions } from "./_components/profile-actions";

export default function SellerProfilePage() {
  const { currentUser, userType, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) {
    return <LoadingSpinner />;
  }

  const profile = currentUser.profile || {};

  return (
    <DashboardLayout userData={currentUser} userType={userType} logout={logout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Seller Profile</h1>
          <ProfileActions />
        </div>

        <div className="grid gap-6">
          <ProfileSection title="Basic Information">
            <ProfileField label="Display Name" value={profile.display_name || "Not set"} />
            <ProfileField label="Bio" value={profile.bio || "No bio provided"} />
            <ProfileField
              label="Member Since"
              value={profile.member_since || "Not set"}
              type="date"
            />
            <ProfileField
              label="Last Active"
              value={profile.last_active || "Not set"}
              type="date"
            />
          </ProfileSection>

          <ProfileSection title="Location">
            <ProfileField label="Country" value={profile.country || "Not set"} />
            <ProfileField label="City" value={profile.city || "Not set"} />
          </ProfileSection>

          <ProfileSection title="Contact & Verification">
            <ProfileField label="Phone Number" value={profile.phone_number || "Not set"} />
            <ProfileField
              label="Email Verified"
              value={profile.email_verified || "Not set"}
              type="boolean"
            />
            <ProfileField
              label="Phone Verified"
              value={profile.phone_verified || "Not set"}
              type="boolean"
            />
            <ProfileField
              label="Identity Verified"
              value={profile.identity_verified || "Not set"}
              type="boolean"
            />
          </ProfileSection>

          <ProfileSection title="Preferences">
            <ProfileField
              label="Email Notifications"
              value={profile.notification_email || "Not set"}
              type="boolean"
            />
            <ProfileField
              label="SMS Notifications"
              value={profile.notification_sms || "Not set"}
              type="boolean"
            />
          </ProfileSection>

          <ProfileSection title="Performance">
            <ProfileField
              label="Transactions Completed"
              value={profile.transactions_completed || 0}
            />
            <ProfileField
              label="Verification Status"
              value={profile.verified_status || "Unverified"}
            />
            <ProfileField label="Created At" value={profile.created_at} type="date" />
            <ProfileField label="Last Updated" value={profile.updated_at} type="date" />
          </ProfileSection>

          <ProfileSection title="Store Information">
            <ProfileField label="Total Sales" value={currentUser.sales?.length || 0} />
            <ProfileField
              label="Store Status"
              value={currentUser.store ? "Active" : "Not Set Up"}
            />
            {/* <ProfileField label="Active Listings" value={currentUser.listings?.length || 0} /> */}
          </ProfileSection>
        </div>
      </div>
    </DashboardLayout>
  );
}
