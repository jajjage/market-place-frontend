"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value.trim());
    router.push(`/explore?${params.toString()}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category.toLowerCase());
    }

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex w-full items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            className="escrow-bg diagonal-lines-right block w-full rounded-lg border border-[rgba(143,242,93,0.3)] bg-[rgb(31,31,31)] p-3 pl-10 text-sm text-white placeholder-gray-400 focus:border-[rgb(143,242,93)] focus:outline-none focus:ring-1 focus:ring-[rgba(143,242,93,0.2)]"
            placeholder="Search for anything..."
          />
        </div>

        {/* Category Selector */}
        <select
          onChange={handleCategoryChange}
          value={searchParams.get("category") || "all"}
          className="escrow-bg h-[42px] rounded-lg border border-[rgba(143,242,93,0.3)] bg-[rgb(31,31,31)] px-3 text-sm text-white focus:border-[rgb(143,242,93)] focus:outline-none focus:ring-1 focus:ring-[rgba(143,242,93,0.2)]"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Garden</option>
          <option value="sports">Sports</option>
          <option value="other">Other</option>
        </select>

        {/* Search Button */}
        <Button
          type="submit"
          className="h-[42px] min-w-[100px] rounded-lg bg-[rgb(143,242,93)] px-6 text-center text-sm font-medium text-black transition-colors hover:bg-[rgba(143,242,93,0.8)] focus:outline-none focus:ring-2 focus:ring-[rgba(143,242,93,0.3)]"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
