"use client";

import type React from "react";
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userData: any;
  logout: () => void;
}

export function DashboardLayout({ children, userData, logout }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Initially collapsed

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={cn(
          "relative flex h-full transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        <DashboardSidebar userData={userData} logout={logout} isCollapsed={isCollapsed} />
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "fixed top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50",
          isCollapsed ? "left-[60px]" : "left-[244px]"
        )}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-300",
          isCollapsed ? "ml-0" : "ml-0"
        )}
      >
        <DashboardNavbar userData={userData} logout={logout} />
        <main className="w-full flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
