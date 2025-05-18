"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProfileActions() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => router.push("/dashboard/seller/profile/update")}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Update Profile
      </Button>
    </div>
  );
}
