"use client";

import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import type { UserType } from "@/types/auth.types";


interface DashboardLayoutProps {
  children: React.ReactNode;
  userData: any;
  userType: UserType;
}

export function DashboardLayout({ children, userData, userType }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar userData={userData} userType={userType} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar userData={userData} />
        <main className="w-full flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
