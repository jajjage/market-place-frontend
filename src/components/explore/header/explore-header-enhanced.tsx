"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, User, Heart, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/landing-page/small-comp";
import { SearchBarWithSuggestions } from "@/components/explore/sections/search-bar-with-suggestions";
import { HeaderFilters } from "./header-filters";

interface ExploreHeaderEnhancedProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
  filters: any[];
  selectedFilters: Record<string, string[]>;
  showFilters?: boolean;
}

export function ExploreHeaderEnhanced({
  searchQuery,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  filters,
  selectedFilters,
  showFilters = true,
}: ExploreHeaderEnhancedProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion & Accessories" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "automotive", label: "Automotive" },
    { value: "collectibles", label: "Collectibles" },
  ];

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
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Search Section */}
          <div className="flex max-w-4xl flex-1 items-center gap-2">
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="whitespace-nowrap rounded-r-none border-r-0 bg-card/50 hover:bg-card/70"
                >
                  Shop by category <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <div className="relative flex-1">
              <SearchBarWithSuggestions
                value={searchQuery}
                onSearch={onSearchChange}
                placeholder="Search for anything"
                className="rounded-none border-x-0"
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 rounded-l-none border-l-0 bg-card/50 hover:bg-card/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button size="lg" className="bg-primary px-8 hover:bg-primary/90">
              Search
            </Button>

            {/* Advanced Link */}
            <Link
              href="/advanced-search"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Advanced
            </Link>
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

      {/* Filters Bar - Only show if showFilters is true */}
      {showFilters && (
        <HeaderFilters
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      )}
    </div>
  );
}
