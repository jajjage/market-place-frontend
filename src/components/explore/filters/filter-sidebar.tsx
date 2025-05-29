import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    filters.reduce((acc, group) => ({ ...acc, [group.id]: true }), {})
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <div className="relative">
      {/* Mobile Filter Toggle */}
      <Button
        variant="outline"
        className="mb-4 flex w-full items-center justify-between lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-black">Filters</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`${
          isOpen ? "fixed inset-0 z-50 mt-0 overflow-y-auto bg-[rgb(48,48,48)]" : "hidden"
        } h-[100dvh] space-y-6 p-4 lg:relative lg:inset-auto lg:mt-0 lg:block lg:h-auto lg:bg-transparent lg:p-0`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[rgb(48,48,48)] py-2">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-sm text-gray-400 hover:text-[rgb(143,242,93)] lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-gray-400 hover:text-[rgb(143,242,93)]"
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {Object.entries(selectedFilters).map(([groupId, values]) =>
          values.map((value) => (
            <Badge
              key={`${groupId}-${value}`}
              variant="secondary"
              className="mr-2 rounded-lg bg-[rgba(143,242,93,0.1)] text-[rgb(143,242,93)]"
              onClick={() => onFilterChange(groupId, value)}
            >
              {value} ×
            </Badge>
          ))
        )}

        <Separator className="bg-[rgba(143,242,93,0.1)]" />

        {/* Filter Groups */}
        <div className="space-y-4">
          {filters.map((group) => (
            <div key={group.id} className="rounded-lg bg-[rgb(31,31,31)] p-2">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between py-2 text-left text-white hover:text-[rgb(143,242,93)]"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="font-medium">{group.title}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    expandedGroups[group.id] ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <div
                className={`ml-2 space-y-4 py-2 ${expandedGroups[group.id] ? "block" : "hidden"}`}
              >
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center space-x-2 text-sm text-gray-300 hover:text-[rgb(143,242,93)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[group.id]?.includes(option.id) || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        onFilterChange(group.id, option.id);
                      }}
                      className="rounded border-gray-500 bg-transparent text-[rgb(143,242,93)] focus:ring-[rgb(143,242,93)] focus:ring-offset-[rgb(31,31,31)]"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
