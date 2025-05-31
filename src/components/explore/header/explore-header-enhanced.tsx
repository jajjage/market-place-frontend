"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  User,
  Heart,
  ShoppingCart,
  Bell,
  Search,
  X,
  Filter,
} from "lucide-react";
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
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
  onClearSearch: () => void;
  filters: any[];
  selectedFilters: Record<string, string[]>;
  showFilters?: boolean;
}

export function ExploreHeaderEnhanced({
  searchQuery,
  onSearchChange,
  onCategoryChange,
  selectedCategory,
  onFilterChange,
  onClearFilters,
  onClearSearch,
  filters,
  selectedFilters,
  showFilters = true,
}: ExploreHeaderEnhancedProps) {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion & Accessories" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "automotive", label: "Automotive" },
    { value: "collectibles", label: "Collectibles" },
  ];

  const handleSearch = useCallback(() => {
    console.log("🔍 Search button clicked");
  }, []);

  const handleClearSearchOnly = useCallback(() => {
    onClearSearch();
  }, [onClearSearch]);

  const handleCategorySelect = useCallback(
    (category: string) => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery.length > 0 || selectedCategory !== "all" || Object.keys(selectedFilters).length > 0;

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    Object.values(selectedFilters).flat().length;

  return (
    <div className="escrow-bg relative overflow-hidden border-b border-border/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500 blur-3xl"></div>
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50"></div> */}
      {/* Subtle grid pattern overlay */}
      <div className="bg-[url('data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\'><defs><pattern id=\\'grid\\' width=\\'60\\' height=\\'60\\' patternUnits=\\'userSpaceOnUse\\'><path d=\\'M 60 0 L 0 0 0 60\\' fill=\\'none\\' stroke=\\'rgb(148 163 184)\\' stroke-width=\\'0.5\\' opacity=\\'0.1\\'/></pattern></defs><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'url(%23grid)\\'/></svg>')] absolute inset-0 opacity-20"></div>

      {/* Top Navigation Bar */}
      {/* <div className="escrow-bg diagonal-lines relative border-b border-border/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">
                Hi!
              </span>
              <Link
                href="/signin"
                className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-primary"
              >
                Sign in
              </Link>
              <span className="text-slate-500">or</span>
              <Link
                href="/register"
                className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-primary"
              >
                register
              </Link>
              <div className="hidden items-center space-x-6 md:flex">
                {[
                  { href: "/deals", label: "Daily Deals" },
                  { href: "/outlet", label: "Brand Outlet" },
                  { href: "/gift-cards", label: "Gift Cards" },
                  { href: "/help", label: "Help & Contact" },
                  { href: "/shipping", label: "Ship to" },
                  { href: "/sell", label: "Sell" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-400 transition-all duration-200 hover:scale-105 hover:text-slate-200"
                  >
                    {item.label}
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-slate-400 transition-all duration-200 hover:text-slate-200"
                    >
                      Watchlist <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-slate-700 bg-slate-900/95 backdrop-blur-md">
                    <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                      <Link href="/watchlist">View Watchlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                      <Link href="/recently-viewed">Recently Viewed</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-slate-400 transition-all duration-200 hover:text-slate-200"
                    >
                      My TrustLock <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-slate-700 bg-slate-900/95 backdrop-blur-md">
                    <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                      <Link href="/purchases">Purchase History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                      <Link href="/selling">Selling</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-slate-400 transition-all duration-200 hover:scale-110 hover:text-slate-200"
                >
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 animate-pulse bg-gradient-to-r from-primary to-blue-500 p-0 text-xs">
                    3
                  </Badge>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-slate-400 transition-all duration-200 hover:scale-110 hover:text-slate-200"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 animate-pulse bg-gradient-to-r from-primary to-blue-500 p-0 text-xs">
                    2
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <div className="container relative mx-auto px-4 py-6">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="transition-transform duration-200 hover:scale-105">
              <Logo />
            </Link>
          </div>

          {/* Search Section */}
          <div className="flex max-w-4xl flex-1 items-center gap-3">
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="group whitespace-nowrap rounded-xl border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-primary/20"
                >
                  <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Shop by category
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 text-slate-400 transition-colors duration-200 group-hover:text-slate-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl border-slate-700 bg-slate-900/95 backdrop-blur-md">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onClick={() => handleCategorySelect(category.value)}
                    className={`rounded-lg text-slate-300 transition-all duration-200 hover:bg-slate-800 ${
                      selectedCategory === category.value ? "bg-primary/20 text-primary" : ""
                    }`}
                  >
                    {category.label}
                    {selectedCategory === category.value && (
                      <span className="ml-auto animate-pulse text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <div className="group relative flex-1">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              <SearchBarWithSuggestions
                value={searchQuery}
                onSearch={onSearchChange}
                placeholder="Search for anything..."
                className="relative rounded-xl border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/80 focus:ring-2 focus:ring-primary/50"
                showClearButton={true}
                onClear={handleClearSearchOnly}
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="w-48 rounded-xl border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-700 bg-slate-900/95 backdrop-blur-md">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="rounded-lg text-slate-300 hover:bg-slate-800"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button
              size="lg"
              className="group rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 shadow-lg transition-all duration-200 hover:scale-105 hover:from-primary/90 hover:to-blue-600/90 hover:shadow-xl hover:shadow-primary/25"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
              <span className="font-medium">Search</span>
            </Button>
          </div>

          {/* Filter Toggle & Clear Filters */}
          <div className="flex items-center gap-2">
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className={`rounded-xl border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/80 ${
                  isFiltersExpanded ? "border-primary/50 bg-primary/20" : ""
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 animate-pulse bg-primary p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            )}

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="rounded-xl border-red-700/50 bg-red-900/20 text-red-300 transition-all duration-200 hover:border-red-600 hover:bg-red-900/40"
              >
                <X className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="animate-fade-in mt-6 flex flex-wrap items-center gap-3">
            <span className="bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-sm font-medium text-transparent">
              Active filters:
            </span>

            {/* Search Query Tag */}
            {searchQuery && (
              <div className="group flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-blue-500/20 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/20">
                <Search className="h-3 w-3 text-primary" />
                <span className="text-slate-200">"{searchQuery}"</span>
                <button
                  onClick={handleClearSearchOnly}
                  className="text-slate-400 transition-colors duration-200 hover:scale-110 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Category Tag */}
            {selectedCategory !== "all" && (
              <div className="group flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20">
                <span className="text-slate-200">
                  Category: {categories.find((c) => c.value === selectedCategory)?.label}
                </span>
                <button
                  onClick={() => handleCategorySelect("all")}
                  className="text-slate-400 transition-colors duration-200 hover:scale-110 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Other Filter Tags */}
            {Object.entries(selectedFilters).map(([filterKey, values]) =>
              values.map((value, index) => (
                <div
                  key={`${filterKey}-${value}`}
                  className="group flex items-center gap-2 rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/20 to-teal-500/20 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="capitalize text-slate-200">
                    {filterKey}: {value}
                  </span>
                  <button
                    onClick={() => onFilterChange(filterKey, value)}
                    className="text-slate-400 transition-colors duration-200 hover:scale-110 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Expandable Filters Section */}
      {showFilters && isFiltersExpanded && (
        <div className="animate-slide-down relative border-t border-slate-700/30 bg-slate-900/30 backdrop-blur-sm">
          <HeaderFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      )}

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-slate-200 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
}
