"use client";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileActions() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => router.push("/dashboard/profile/update")}
        className="flex items-center gap-2"
      >
        <EditIcon className="h-4 w-4" /> Edit Profile
      </Button>
    </div>
  );
}
