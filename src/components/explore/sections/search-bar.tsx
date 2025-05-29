import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ onSearch, onFilterClick }: SearchBarProps) {
  return (
    <div className="w-full">
      <div className="relative flex w-full items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="search"
            className="escrow-bg diagonal-lines-right block w-full rounded-lg border border-green-200 p-3 pl-10 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search for anything..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Category Selector */}
        <select className="escrow-bg rounded-lg border border-green-200 p-3 text-sm text-white focus:border-blue-500 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Garden</option>
          <option>Sports</option>
          <option>Toys</option>
          <option>Other</option>
        </select>

        {/* Search Button */}
        <Button
          type="button"
          className="rounded-lg bg-[rgb(143,242,93)] px-6 py-3 text-center text-sm font-medium text-black hover:bg-[rgba(143,242,93,0.8)] focus:outline-none focus:ring-4 focus:ring-[rgba(143,242,93,0.3)]"
        >
          Search
        </Button>

        {/* Filter Button - Only shown when onFilterClick is provided */}
        {onFilterClick && (
          <Button
            variant="outline"
            size="icon"
            onClick={onFilterClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(143,242,93,0.3)] p-2.5 text-sm font-medium text-white hover:border-[rgb(143,242,93)] hover:text-[rgb(143,242,93)] focus:outline-none focus:ring-4 focus:ring-[rgba(143,242,93,0.3)] lg:hidden"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Filter options</span>
          </Button>
        )}
      </div>
    </div>
  );
}
