"use client";

import { useState, useEffect } from "react";

// Mock suggestions - replace with actual API call
const mockSuggestions = [
  "Nike Air Force 1",
  "Nike Air Jordan",
  "Nike SB Dunk",
  "PlayStation 5",
  "PlayStation 4",
  "MacBook Pro",
  "MacBook Air",
  "iPhone 14",
  "iPhone 13",
  "Samsung Galaxy",
  "AirPods Pro",
  "Apple Watch",
  "Gaming Chair",
  "Mechanical Keyboard",
  "Wireless Mouse",
];

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = mockSuggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);

      setSuggestions(filtered);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, isLoading };
}
