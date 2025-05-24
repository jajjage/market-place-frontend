"use client";

import { useAuth } from "@/providers/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ProfileSection } from "./_components/profile-section";
import { ProfileField } from "./_components/profile-field";
import { ProfileHeader } from "./_components/profile-header";
import { VerificationBadge } from "./_components/verification-badge";
import { AnalyticsIcon, OrdersIcon, ProfileIcon } from "@/components/ui/icons";
import { StatsCard } from "./_components/stats-card";

export default function SellerProfilePage() {
  const { currentUser, userType, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) {
    return <LoadingSpinner />;
  }

  const calculateCompletionRate = () => {
    const fields = [
      currentUser.profile.email_verified,
      currentUser.profile.phone_verified,
      currentUser.profile.identity_verified,
      currentUser.profile.display_name,
      currentUser.profile.bio,
      currentUser.profile.phone_number,
      currentUser.profile.country,
      currentUser.profile.city,
    ];
    const completedFields = fields.filter((field) => field && field !== "Not Set").length;
    const totalFields = fields.length;
    const percentage = Math.round((completedFields / totalFields) * 100);
    return `${percentage}%`;
  };

  return (
    <DashboardLayout userData={currentUser} logout={logout}>
      <div className="mx-auto max-w-6xl space-y-6">
        <ProfileHeader user={currentUser} />
        <VerificationBadge user={currentUser} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Sales"
            value={currentUser.sales?.length}
            icon={<OrdersIcon />}
            color="bg-indigo-50 text-indigo-600"
          />
          <StatsCard
            title="Completion Rate"
            value={calculateCompletionRate()}
            icon={<AnalyticsIcon />}
            color="bg-blue-50 text-blue-600"
          />
          <StatsCard
            title="Member Since"
            value={
              currentUser.profile.member_since
                ? new Date(currentUser.profile.member_since).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })
                : "N/A"
            }
            icon={<ProfileIcon />}
            color="bg-purple-50 text-purple-600"
          />
        </div>

        <div className="grid gap-6">
          <ProfileSection title="Basic Information">
            <ProfileField label="Display Name" value={currentUser.profile.display_name} />
            <ProfileField label="Bio" value={currentUser.profile.bio || "Not Set"} />
            <ProfileField
              label="Member Since"
              value={currentUser.profile.member_since || "Not Set"}
              type="date"
            />
            <ProfileField
              label="Last Active"
              value={currentUser.profile.last_active || "Not Set"}
              type="date"
            />
          </ProfileSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProfileSection title="Location">
              <ProfileField label="Country" value={currentUser.profile.country || "Not Set"} />
              <ProfileField label="City" value={currentUser.profile.city || "Not Set"} />
            </ProfileSection>

            <ProfileSection title="Contact Information">
              <ProfileField label="Email" value={currentUser.email} />
              <ProfileField
                label="Phone Number"
                value={currentUser.profile.phone_number || "Not Set"}
              />
            </ProfileSection>
          </div>

          <ProfileSection title="Verification Status">
            <ProfileField
              label="Email Verified"
              value={currentUser.profile.email_verified || "Not Set"}
              type="boolean"
            />
            <ProfileField
              label="Phone Verified"
              value={currentUser.profile.phone_verified || "Not Set"}
              type="boolean"
            />
            <ProfileField
              label="Identity Verified"
              value={currentUser.profile.identity_verified || "Not Set"}
              type="boolean"
            />
            <ProfileField label="Seller Status" value={currentUser.profile.verified_status} />
          </ProfileSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProfileSection title="Preferences">
              <ProfileField
                label="Email Notifications"
                value={currentUser.profile.notification_email || "Not Set"}
                type="boolean"
              />
              <ProfileField
                label="SMS Notifications"
                value={currentUser.profile.notification_sms || "Not Set"}
                type="boolean"
              />
            </ProfileSection>

            <ProfileSection title="Store Information">
              <ProfileField label="Store Name" value={currentUser.store?.name || "Not Set Up"} />
              <ProfileField label="Store Status" value={currentUser.store?.name || "Not Active"} />
            </ProfileSection>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
