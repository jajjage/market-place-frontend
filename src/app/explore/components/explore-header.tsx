"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/landing-page/small-comp";
import { SearchBar } from "@/components/explore/sections/search-bar";
import { useDebounce } from "@/hooks/use-debounce";

export function ExploreHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Update URL with search query
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
    // Add a small delay before hiding the loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-600/30 bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(45,45,45)]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6 lg:gap-12">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="relative max-w-2xl flex-1 lg:max-w-3xl xl:max-w-4xl">
            <SearchBar value={searchQuery} onSearch={handleSearchChange} />
            {isLoading && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 transform">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[rgb(143,242,93)] border-t-transparent" />
              </div>
            )}
          </div>
          <div className="hidden flex-shrink-0 md:block">
            {/* We can add user menu or other controls here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}
