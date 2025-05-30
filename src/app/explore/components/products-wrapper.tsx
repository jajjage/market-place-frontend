"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import { ExploreFilters } from "./explore-filters";
import { ProductsCard } from "@/components/explore/cards/product-card";
import { ProductCardSkeleton } from "@/components/explore/cards/product-card-skeleton";
import { Logo } from "@/components/landing-page/small-comp";
import { SearchBarWithSuggestions } from "@/components/explore/sections/search-bar-with-suggestions";
import type { Product, ProductFilters } from "@/types/product";

interface ProductsWrapperProps {
  initialProducts?: Product[];
  initialFilters?: ProductFilters;
  mockFilters: any[];
}

export function ProductsWrapper({
  initialProducts = [],
  initialFilters = {},
  mockFilters,
}: ProductsWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || initialFilters.search || ""
  );
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Debounce search query to avoid hitting API on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Update URL with search query and filters
  useEffect(() => {
    setIsSearchLoading(true);
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    // Add other filters to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && key !== "search") {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);

    // Add a small delay before hiding the loading state
    const timer = setTimeout(() => {
      setIsSearchLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, filters, pathname, router, searchParams]);

  // Memoize the actual filters to prevent unnecessary re-renders
  const actualFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch || undefined,
    }),
    [filters, debouncedSearch]
  );

  // Use TanStack Query for data fetching
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(actualFilters, {
    initialData:
      initialProducts.length > 0
        ? {
            data: initialProducts,
            count: initialProducts.length,
            next: undefined,
            previous: undefined,
          }
        : undefined,
  });

  const products = productsData?.data || initialProducts;

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(31,31,31)]">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-gray-600/30 bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(45,45,45)]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-6 lg:gap-12">
              <div className="flex-shrink-0">
                <Logo />
              </div>
              <div className="relative max-w-2xl flex-1 lg:max-w-3xl xl:max-w-4xl">
                <SearchBarWithSuggestions value={searchQuery} onSearch={handleSearchChange} />
                {isSearchLoading && (
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

        <div className="container mx-auto px-4 py-8">
          <div className="min-w-0 flex-1">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-white">Explore Products</h2>
              <p className="text-red-400">
                Failed to load products: {error?.message || "Unknown error"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(31,31,31)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-600/30 bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(45,45,45)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6 lg:gap-12">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="relative max-w-2xl flex-1 lg:max-w-3xl xl:max-w-4xl">
              <SearchBarWithSuggestions value={searchQuery} onSearch={handleSearchChange} />
              {isSearchLoading && (
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-32">
              <ExploreFilters
                filters={mockFilters}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isLoading={isFetching}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="min-w-0 flex-1">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-white">Explore Products</h2>
              <p className="text-gray-400">
                {isLoading
                  ? "Loading products..."
                  : `${productsData?.count || products.length} products available with escrow protection`}
                {isFetching && !isLoading && (
                  <span className="ml-2 text-blue-400">(Updating...)</span>
                )}
              </p>
            </div>

            <MasonryGrid>
              {isLoading && !products.length
                ? // Show skeletons on initial load
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={`skeleton-${index}`} className="mb-6">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.id} className="mb-6">
                      <ProductsCard
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        escrowFee={10} // Calculate based on your business logic
                        image={product.images?.[0] || getPlaceholderImage(600, 400, product.id)}
                        seller={{
                          id: product.seller?.id ?? "unknown",
                          avatar:
                            product.seller?.avatar ||
                            getPlaceholderImage(100, 100, product.seller?.id ?? "unknown"),
                          name:
                            product.seller?.full_name ||
                            product.seller?.first_name ||
                            "Unknown Seller",
                          rating: product.seller?.average_rating ?? 0,
                          isVerified: product.seller?.is_verified ?? false,
                        }}
                        location={"Location not specified"}
                        escrowStatus={"available"}
                      />
                    </div>
                  ))}
            </MasonryGrid>

            {/* Show loading overlay when fetching new data */}
            {isFetching && products.length > 0 && (
              <div className="fixed bottom-4 right-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
                Updating products...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};
