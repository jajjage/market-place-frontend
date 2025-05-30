"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useSearchSuggestions } from "@/hooks/use-search-suggestions";

interface SearchBarWithSuggestionsProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBarWithSuggestions({
  value,
  onSearch,
  placeholder = "Search for anything...",
  className,
}: SearchBarWithSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(inputValue, 300);
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const { suggestions, isLoading: suggestionsLoading } = useSearchSuggestions(debouncedQuery);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== value) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      onSearch(suggestion);
      addToHistory(suggestion);
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [onSearch, addToHistory]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSearch(inputValue.trim());
        addToHistory(inputValue.trim());
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [inputValue, onSearch, addToHistory]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  const showDropdown = isOpen && (suggestions.length > 0 || searchHistory.length > 0);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className="border-border bg-card/50 pl-10 pr-10 transition-colors focus:bg-card/70"
          />
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <Card className="absolute top-full z-50 mt-1 w-full border-border bg-card shadow-lg">
          <CardContent className="p-0">
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b border-border p-2">
                <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  Suggestions
                </div>
                <div className="space-y-1">
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      <Search className="h-3 w-3 text-muted-foreground" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="p-2">
                <div className="mb-2 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Recent searches
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="h-auto p-1 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <button
                        onClick={() => handleSuggestionClick(item)}
                        className="flex flex-1 items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted"
                      >
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{item}</span>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromHistory(item)}
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove from history</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading state */}
            {suggestionsLoading && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Loading suggestions...
              </div>
            )}

            {/* Empty state */}
            {!suggestionsLoading &&
              suggestions.length === 0 &&
              searchHistory.length === 0 &&
              inputValue && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No suggestions found
                </div>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
