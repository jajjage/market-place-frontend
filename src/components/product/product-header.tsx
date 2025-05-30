"use client";
import Link from "next/link";
import { ChevronDown, Menu, User, Heart, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/landing-page/small-comp";

export function ProductHeader() {
  return (
    <div className="diagonal-lines-subtle border-b border-border/30 bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(45,45,45)]">
      {/* Top Navigation Bar */}
      <div className="border-b border-border/20 bg-[rgb(45,45,45)]">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Hi! </span>
              <Link href="/signin" className="text-foreground transition-colors hover:text-primary">
                Sign in
              </Link>
              <span className="text-muted-foreground">or</span>
              <Link
                href="/register"
                className="text-foreground transition-colors hover:text-primary"
              >
                register
              </Link>
            </div>
            <div className="hidden items-center space-x-6 md:flex">
              <Link
                href="/deals"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Daily Deals
              </Link>
              <Link
                href="/outlet"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Brand Outlet
              </Link>
              <Link
                href="/gift-cards"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Gift Cards
              </Link>
              <Link
                href="/help"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Help & Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/shipping"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Ship to
              </Link>
              <Link
                href="/sell"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Sell
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Watchlist <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/watchlist">View Watchlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/recently-viewed">Recently Viewed</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    My TrustLock <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/purchases">Purchase History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/selling">Selling</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -right-1 -top-1 h-4 w-4 bg-primary/80 p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                <Badge className="absolute -right-1 -top-1 h-4 w-4 bg-primary/80 p-0 text-xs">
                  2
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Search Bar - Simplified for product page */}
          <div className="mx-auto hidden max-w-xl flex-1 md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full rounded-l-md border border-r-0 border-border bg-card/50 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button className="absolute right-0 top-0 h-full rounded-l-none">Search</Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden items-center space-x-2 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 bg-primary/80 p-0 text-xs">
                2
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
