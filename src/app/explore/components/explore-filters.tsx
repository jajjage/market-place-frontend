"use client";

import { useCallback, useState } from "react";
import { FilterSidebar } from "@/components/explore/filters/filter-sidebar";
import { MobileFilterDrawer } from "@/components/explore/filters/mobile-filter-drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { ProductFilters } from "@/types/product";

interface ExploreFiltersProps {
  filters: any[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filters: Partial<ProductFilters>) => void;
  onClearFilters?: () => void;
  isLoading?: boolean;
  initialSelectedFilters?: Record<string, string[]>;
}

export function ExploreFilters({
  filters,
  onFilterChange,
  onClearFilters,
  initialSelectedFilters = {},
}: ExploreFiltersProps) {
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialSelectedFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const handleFilterChange = useCallback(
    (groupId: string, value: string) => {
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        if (!newFilters[groupId]) {
          newFilters[groupId] = [value];
        } else {
          const index = newFilters[groupId].indexOf(value);
          if (index === -1) {
            newFilters[groupId] = [...newFilters[groupId], value];
          } else {
            newFilters[groupId] = newFilters[groupId].filter((v) => v !== value);
            if (newFilters[groupId].length === 0) {
              delete newFilters[groupId];
            }
          }
        }

        // Convert filter selections to API format
        const apiFilters: Partial<ProductFilters> = {};

        // Handle category filters
        if (newFilters.category?.length > 0) {
          apiFilters.category_name = newFilters.category[0];
        }

        // Handle price range filters
        type FilterOption = {
          id: string;
          min_price?: number;
          max_price?: number;
          [key: string]: any;
        };

        type FilterGroup = {
          id: string;
          options: FilterOption[];
          [key: string]: any;
        };

        if (newFilters.price?.length > 0) {
          const priceOption = filters
            .find((f: FilterGroup) => f.id === "price")
            ?.options.find((opt: FilterOption) => newFilters.price.includes(opt.id)) as
            | FilterOption
            | undefined;

          if (priceOption) {
            if (priceOption.min_price !== undefined) {
              apiFilters.min_price = priceOption.min_price;
            }
            if (priceOption.max_price !== undefined) {
              apiFilters.max_price = priceOption.max_price;
            }
          }
        }

        // Handle seller type filters
        if (newFilters.seller?.length > 0) {
          // Map to your API's seller filtering logic
        }

        // Dispatch the filter change asynchronously
        Promise.resolve().then(() => {
          onFilterChange?.(apiFilters);
        });

        return newFilters;
      });
    },
    [filters, onFilterChange]
  );

  const handleClearFilters = useCallback(() => {
    setSelectedFilters({});
    onClearFilters?.();
  }, [onClearFilters]);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  if (isMobile) {
    return (
      <MobileFilterDrawer
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    );
  }

  return (
    <div className="space-y-6">
      <FilterSidebar
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}
