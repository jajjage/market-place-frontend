"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductsCard } from "@/components/explore/cards/product-card";
import { ProductCardSkeleton } from "@/components/explore/cards/product-card-skeleton";
import { ExploreHeaderEnhanced } from "@/components/explore/header/explore-header-enhanced";
import { TrustIndicators } from "@/components/explore/sections/trust-indicators";
import { MasonryGrid } from "@/components/ui/masonry-grid";
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

  // Initialize state from URL params
  const initialSearch = searchParams.get("search") || initialFilters.search || "";
  const initialCategory = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Debounce search query to avoid hitting API on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Memoize the actual filters to prevent unnecessary re-renders
  const actualFilters = useMemo(() => {
    const result: Record<string, any> = {
      ...filters,
    };

    // Only add search if it has a value and length >= 2
    if (debouncedSearch && debouncedSearch.trim().length >= 2) {
      result.search = debouncedSearch.trim();
    }

    // Add category filter if not "all"
    if (selectedCategory && selectedCategory !== "all") {
      result.category_name = selectedCategory;
    }

    // Add selected filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result[key] = values.length === 1 ? values[0] : values;
      }
    });

    return result;
  }, [filters, debouncedSearch, selectedCategory, selectedFilters]);

  // Use TanStack Query for data fetching
  const hasInitialData = initialProducts.length > 0;
  const shouldUseInitialData = hasInitialData && !debouncedSearch && selectedCategory === "all";

  const {
    data: productsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(actualFilters, {
    initialData: shouldUseInitialData
      ? {
          data: initialProducts,
          count: initialProducts.length,
          next: undefined,
          previous: undefined,
        }
      : undefined,
    enabled: true,
  });

  const isSearching = searchQuery !== debouncedSearch;
  const isLoadingResult = isFetching && !isSearching;

  // Handle empty result
  const hasResult = (productsData?.data?.length ?? 0) > 0;
  const showNoResult =
    !isLoadingResult && !hasResult && (debouncedSearch.length > 0 || selectedCategory !== "all");

  // Update URL when debounced search, category, or filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add search to URL
    if (debouncedSearch && debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    // Add category to URL
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    // Add other filters to URL (exclude search and category as they're handled above)
    Object.entries(actualFilters).forEach(([key, value]) => {
      if (
        key !== "search" &&
        key !== "category_name" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)));
        } else {
          params.set(key, String(value));
        }
      }
    });

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      console.log("🔄 Updating URL:", newUrl);
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedSearch, selectedCategory, actualFilters, pathname, router, searchParams]);

  // Get products from API or fallback to initial
  const products = useMemo(() => {
    // If we have API data, use it
    if (productsData?.data) {
      return productsData.data;
    }

    // If we're searching or filtering and no API data, return empty array
    if (
      debouncedSearch.length >= 2 ||
      selectedCategory !== "all" ||
      Object.keys(selectedFilters).length > 0
    ) {
      return [];
    }

    // Otherwise use initial products
    return initialProducts;
  }, [productsData?.data, debouncedSearch, selectedCategory, selectedFilters, initialProducts]);

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

        // Handle category filters (but don't override the main category)
        if (newFilters.category?.length > 0 && selectedCategory === "all") {
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
          const priceOption = mockFilters
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
          apiFilters.category_name = newFilters.seller[0];
        }

        // Update filters
        setFilters((prev) => ({ ...prev, ...apiFilters }));
        return newFilters;
      });
    },
    [mockFilters, selectedCategory]
  );

  const handleSearchChange = useCallback((query: string) => {
    console.log("🔍 Search change:", query);
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    console.log("📂 Category change:", category);
    setSelectedCategory(category);
  }, []);

  const handleClearFilters = useCallback(() => {
    console.log("🧹 Clearing all filters");
    setSelectedFilters({});
    setSearchQuery("");
    setSelectedCategory("all");
    setFilters({});

    // Clear URL params
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const handleClearSearch = useCallback(() => {
    console.log("🧹 Clearing search only");
    setSearchQuery("");
  }, []);

  // Mock stats for trust indicators
  const mockStats = {
    totalTransactions: 50000,
    verifiedSellers: 15000,
    moneyProtected: 25000000,
  };

  if (isError) {
    return (
      <div className="min-h-screen">
        <ExploreHeaderEnhanced
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onClearSearch={handleClearSearch}
          filters={mockFilters}
          selectedFilters={selectedFilters}
        />

        <div className="escrow-bg">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <ExploreHeaderEnhanced
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onClearSearch={handleClearSearch}
        filters={mockFilters}
        selectedFilters={selectedFilters}
      />

      {/* Scrollable Content */}
      <div className="escrow-bg">
        {/* Trust Indicators Section */}
        <section className="border-b border-gray-600/30 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent">
          <div className="container mx-auto px-4 py-4">
            <TrustIndicators stats={mockStats} />
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8">
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
            {searchQuery && (
              <p className="mt-1 text-gray-300">
                Search results for:{" "}
                <span className="font-semibold text-primary">"{searchQuery}"</span>
              </p>
            )}
            {selectedCategory && selectedCategory !== "all" && (
              <p className="mt-1 text-gray-300">
                Category:{" "}
                <span className="font-semibold capitalize text-primary">{selectedCategory}</span>
              </p>
            )}
          </div>

          {/* Masonry Grid Layout with proper spacing */}
          {isLoading && !products.length ? (
            // Show skeletons in masonry layout on initial load
            <MasonryGrid
              breakpointCols={{
                default: 4,
                1536: 5,
                1280: 4,
                1024: 3,
                768: 2,
                640: 2,
                500: 1,
              }}
              className="w-full"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </MasonryGrid>
          ) : products.length > 0 ? (
            <MasonryGrid
              breakpointCols={{
                default: 4,
                1536: 5,
                1280: 4,
                1024: 3,
                768: 2,
                640: 2,
                500: 1,
              }}
              className="w-full"
            >
              {products.map((product) => (
                <div key={product.id}>
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
                        product.seller?.full_name || product.seller?.first_name || "Unknown Seller",
                      rating: product.seller?.average_rating ?? 0,
                      isVerified: product.seller?.is_verified ?? false,
                    }}
                    location={"Location not specified"}
                    escrowStatus={"available"}
                  />
                </div>
              ))}
            </MasonryGrid>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-white">No products found</h3>
              <p className="mb-4 text-gray-400">
                {searchQuery
                  ? `No products match your search for "${searchQuery}"`
                  : selectedCategory !== "all"
                    ? `No products found in "${selectedCategory}" category`
                    : "No products match your current filters"}
              </p>
              <button
                onClick={handleClearFilters}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Show loading overlay when fetching new data */}
          {isFetching && products.length > 0 && (
            <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
              Updating products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};
