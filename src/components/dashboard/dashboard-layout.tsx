"use client";

import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userData: any;
  logout: () => void;
}

export function DashboardLayout({ children, userData, logout }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar userData={userData} logout={logout} />
      <div className="diagonal-lines flex flex-1 flex-col overflow-hidden bg-[rgb(31,31,31)]">
        <DashboardNavbar userData={userData} logout={logout} />
        <main className="diagonal-lines-subtle w-full flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
