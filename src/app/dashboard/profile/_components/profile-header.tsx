import { User } from "@/types/user";
import { BadgeIcon, EditIcon } from "lucide-react";
import { ProfileActions } from "./profile-actions";

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.98)] p-6 md:flex-row md:items-start">
      <div className="relative">
        <img
          src={user.avatar_url ?? undefined}
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-[rgba(143,242,93,0.1)] object-cover"
        />
        {user.verification_status === "Gold Seller" && (
          <span className="absolute -bottom-2 -right-2 text-[rgb(143,242,93)]">
            <BadgeIcon />
          </span>
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold text-white">{user.profile.display_name}</h1>
        <p className="mt-1 text-gray-400">{user.email}</p>
        <p className="mt-2 text-gray-300">{user.profile.bio}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          <div className="rounded-full bg-[rgba(143,242,93,0.1)] px-3 py-1 text-sm font-medium text-[rgb(143,242,93)]">
            {user.verification_status}
          </div>
          <div className="rounded-full bg-[rgba(143,242,93,0.15)] px-3 py-1 text-sm font-medium text-[rgb(143,242,93)]">
            {user.profile.transactions_completed} Sales
          </div>
        </div>
      </div>
      <ProfileActions />
    </div>
  );
};
