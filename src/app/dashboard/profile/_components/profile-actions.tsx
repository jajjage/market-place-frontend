"use client";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileActions() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <button
        onClick={() => router.push("/dashboard/profile/update")}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700"
      >
        <EditIcon /> Edit Profile
      </button>
    </div>
  );
}
