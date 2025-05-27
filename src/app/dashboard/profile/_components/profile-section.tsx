"use client";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <div className="diagonal-lines-subtle rounded-xl border border-[rgba(143,242,93,0.1)] bg-[rgba(31,31,31,0.98)] p-6">
      <h2 className="mb-4 text-lg font-medium text-white">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
