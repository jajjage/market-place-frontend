"use client";

import {
  Home,
  ShoppingBag,
  MapPin,
  AlertCircle,
  User,
  Store,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DashboardSidebarProps {
  userData: any;
  logout: () => void;
  isCollapsed: boolean;
}

export function DashboardSidebar({ userData, logout, isCollapsed }: DashboardSidebarProps) {
  const pathname = usePathname();
  const userInitials = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`;
  const transactionsCount = (userData.purchases?.length || 0) + (userData.sales?.length || 0);
  const disputesCount = userData.disputes?.length || 0;

  return (
    <Sidebar
      className={cn(
        "fixed left-0 h-full transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      <SidebarHeader className="border-b">
        <div
          className={cn("flex items-center px-2 py-3", isCollapsed ? "justify-center" : "gap-2")}
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage
              src={userData.avatar_url || " "}
              alt={`${userData.first_name} ${userData.last_name}`}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">{`${userData.first_name} ${userData.last_name}`}</span>
              <span className="text-xs text-muted-foreground">User</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Dashboard</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    {!isCollapsed && <span>Home</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/transactions")}>
                  <Link href="/dashboard/transactions" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    {!isCollapsed && (
                      <>
                        <span>Transactions</span>
                        {transactionsCount > 0 && (
                          <Badge className="ml-auto">{transactionsCount}</Badge>
                        )}
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/addresses")}>
                  <Link href="/dashboard/addresses" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {!isCollapsed && <span>Addresses</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userData.store && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/store")}>
                    <Link href="/dashboard/store" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      {!isCollapsed && <span>Store</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {disputesCount > 0 && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/disputes")}>
                    <Link href="/dashboard/disputes" className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span>Disputes</span>
                          <Badge className="ml-auto">{disputesCount}</Badge>
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Account</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"}>
                  <Link href="/dashboard/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {!isCollapsed && <span>Profile</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {!userData.profile.verified_status && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/verification"}>
                    <Link href="/dashboard/verification" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {!isCollapsed ? (
                        <>
                          <span>Verify Account</span>
                          <Badge className="ml-auto">!</Badge>
                        </>
                      ) : (
                        <Badge className="ml-auto">!</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={() => logout()} className="flex w-full items-center gap-2">
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
