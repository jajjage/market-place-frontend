import { User } from "@/types/user";
import { BadgeIcon, EditIcon } from "lucide-react";
import { ProfileActions } from "./profile-actions";

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-start">
      <div className="relative">
        <img
          src={user.avatar_url ?? ""}
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-white object-cover shadow"
        />
        {user.profile.verified_status === "Gold Seller" && (
          <span className="absolute -bottom-2 -right-2">
            <BadgeIcon />
          </span>
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-800">{user.profile.display_name}</h1>
        <p className="mt-1 text-gray-500">{user.email}</p>
        <p className="mt-2 text-gray-600">{user.profile.bio}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            {user.profile.verified_status}
          </div>
          <div className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            {user.profile.transactions_completed} Sales
          </div>
        </div>
      </div>
      <ProfileActions />
    </div>
  );
};
