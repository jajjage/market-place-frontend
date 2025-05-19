"use client";

import {
  Home,
  ShoppingBag,
  MapPin,
  AlertCircle,
  User,
  Store,
  BarChart3,
  Star,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { UserType } from "@/types/auth.types";
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
import Link from "next/link";

interface DashboardSidebarProps {
  userData: any;
  userType: UserType;
  logout: () => void;
}

export function DashboardSidebar({ userData, userType, logout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const userInitials = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`;
  const purchasesCount = userData.purchases?.length || 0;
  const salesCount = userData.sales?.length || 0;
  const disputesCount = userData.disputes?.length || 0;

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={userData.avatar_url || ""}
              alt={`${userData.first_name} ${userData.last_name}`}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{`${userData.first_name} ${userData.last_name}`}</span>
            <span className="text-xs text-muted-foreground">{userType}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userType === "BUYER" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/buyer/purchases"}>
                      <Link href="/dashboard/buyer/purchases">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Purchases</span>
                        {purchasesCount > 0 && <Badge className="ml-auto">{purchasesCount}</Badge>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/buyer/addresses"}>
                      <Link href="/dashboard/buyer/addresses">
                        <MapPin className="h-4 w-4" />
                        <span>Addresses</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {userType === "SELLER" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/seller/store"}>
                      <Link href="/dashboard/seller/store">
                        <Store className="h-4 w-4" />
                        <span>Store</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/seller/sales"}>
                      <Link href="/dashboard/seller/sales">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Sales</span>
                        {salesCount > 0 && <Badge className="ml-auto">{salesCount}</Badge>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/seller/analytics"}
                    >
                      <Link href="/dashboard/seller/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/seller/ratings"}>
                      <Link href="/dashboard/seller/ratings">
                        <Star className="h-4 w-4" />
                        <span>Ratings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/disputes"}>
                  <Link href="/dashboard/disputes">
                    <AlertCircle className="h-4 w-4" />
                    <span>Disputes</span>
                    {disputesCount > 0 && <Badge className="ml-auto">{disputesCount}</Badge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/dashboard/${userType.toLowerCase()}/profile`}
                >
                  <Link href={`/dashboard/${userType.toLowerCase()}/profile`}>
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {userType === "SELLER" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/seller/verification"}
                  >
                    <Link href="/dashboard/seller/verification">
                      <Shield className="h-4 w-4" />
                      <span>
                        {userData.profile.email_verified &&
                        userData.profile.phone_verified &&
                        userData.profile.identity_verified
                          ? "Verified"
                          : "Verify Account"}
                      </span>
                      {!(
                        userData.profile.email_verified &&
                        userData.profile.phone_verified &&
                        userData.profile.identity_verified
                      ) && <Badge className="ml-auto">!</Badge>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
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
              <button onClick={() => logout()}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
