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
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface DashboardSidebarProps {
  userData: any;
  logout: () => void;
}

export function DashboardSidebar({ userData, logout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const userInitials = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`;
  const purchasesCount = userData.purchases?.length || 0;
  const salesCount = userData.sales?.length || 0;
  const disputesCount = userData.disputes?.length || 0;

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Purchases", href: "/dashboard/purchases", icon: ShoppingBag, count: purchasesCount },
    { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
    { name: "Store", href: "/dashboard/my-store", icon: Store },
    { name: "Sales", href: "/dashboard/sales", icon: ShoppingBag, count: salesCount },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Ratings", href: "/dashboard/ratings", icon: Star },
    { name: "Disputes", href: "/dashboard/disputes", icon: AlertCircle, count: disputesCount },
  ];

  const accountNavigation = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

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
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {item.count > 0 && <Badge className="ml-auto">{item.count}</Badge>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
