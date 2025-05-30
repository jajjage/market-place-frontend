"use client";
import { ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface HeaderFiltersProps {
  filters: any[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
}

export function HeaderFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: HeaderFiltersProps) {
  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="border-t border-border/20 bg-[rgb(42,42,42)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center space-x-2">
              {filters.map((filterGroup) => (
                <DropdownMenu key={filterGroup.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`relative border-border/50 bg-card/30 hover:bg-card/50 ${
                        selectedFilters[filterGroup.id]?.length > 0
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {filterGroup.title}
                      <ChevronDown className="ml-2 h-3 w-3" />
                      {selectedFilters[filterGroup.id]?.length > 0 && (
                        <Badge className="absolute -right-1 -top-1 h-4 w-4 bg-primary/80 p-0 text-xs">
                          {selectedFilters[filterGroup.id].length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {filterGroup.options.map((option: any) => (
                      <DropdownMenuItem
                        key={option.id}
                        onClick={() => onFilterChange(filterGroup.id, option.id)}
                        className={
                          selectedFilters[filterGroup.id]?.includes(option.id)
                            ? "bg-primary/10 text-primary"
                            : ""
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>{option.label}</span>
                          {selectedFilters[filterGroup.id]?.includes(option.id) && (
                            <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Active:</span>
                  {Object.entries(selectedFilters).map(([groupId, values]) =>
                    values.map((value) => {
                      const filterGroup = filters.find((f) => f.id === groupId);
                      const option = filterGroup?.options.find((o: any) => o.id === value);
                      return (
                        <Badge
                          key={`${groupId}-${value}`}
                          variant="secondary"
                          className="border-primary/20 bg-primary/10 text-primary"
                        >
                          {option?.label || value}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-3 w-3 p-0 hover:bg-primary/20"
                            onClick={() => onFilterChange(groupId, value)}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* Clear All */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="bg-card/30 hover:bg-card/50"
            >
              Clear all ({activeFilterCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
