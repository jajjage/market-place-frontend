"use client";

import { Logo } from "@/components/landing-page/small-comp";
import { SearchBar } from "@/components/explore/sections/search-bar";

export function ExploreHeader() {
  const handleSearch = (query: string) => {
    console.log(query);
    // TODO: Implement search functionality
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-600/30 bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(45,45,45)]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6 lg:gap-12">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="max-w-2xl flex-1 lg:max-w-3xl xl:max-w-4xl">
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* Optional: Add user actions or notifications here */}
          <div className="hidden flex-shrink-0 md:block">
            {/* You can add user menu, notifications, etc. here */}
          </div>
        </div>
      </div>
    </header>
  );
}
