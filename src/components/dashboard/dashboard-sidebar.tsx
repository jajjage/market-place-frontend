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
} from "lucide-react";
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

interface DashboardSidebarProps {
  userData: any;
  userType: UserType;
  logout: () => void;
}

export function DashboardSidebar({ userData, userType, logout }: DashboardSidebarProps) {
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
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userType === "BUYER" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Purchases</span>
                        {purchasesCount > 0 && <Badge className="ml-auto">{purchasesCount}</Badge>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <MapPin className="h-4 w-4" />
                        <span>Addresses</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {userType === "SELLER" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Store className="h-4 w-4" />
                        <span>Store</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Sales</span>
                        {salesCount > 0 && <Badge className="ml-auto">{salesCount}</Badge>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Star className="h-4 w-4" />
                        <span>Ratings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <AlertCircle className="h-4 w-4" />
                    <span>Disputes</span>
                    {disputesCount > 0 && <Badge className="ml-auto">{disputesCount}</Badge>}
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href="#">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
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
