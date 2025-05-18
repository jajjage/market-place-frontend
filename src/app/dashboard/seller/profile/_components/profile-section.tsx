"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <Card className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}
