"use client";

import { useState } from "react";
import { FilterSidebar } from "@/components/explore/filters/filter-sidebar";

export function ExploreFilters({
  filters,
  initialSelectedFilters = {},
}: {
  filters: any[];
  initialSelectedFilters?: Record<string, string[]>;
}) {
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialSelectedFilters);

  const handleFilterChange = (groupId: string, value: string) => {
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
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <FilterSidebar
      filters={filters}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
}
