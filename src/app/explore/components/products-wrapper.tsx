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

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || initialFilters.search || ""
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Debounce search query to avoid hitting API on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Update URL with search query and filters
  useEffect(() => {
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

    const newUrl = `${pathname}?${params.toString()}`;
    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      router.push(newUrl, { scroll: false });
    }
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
        }

        // Update filters
        setFilters((prev) => ({ ...prev, ...apiFilters }));
        return newFilters;
      });
    },
    [mockFilters]
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Update filters to trigger API call
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters({});
    setFilters({ search: searchQuery }); // Keep search but clear other filters
    setSearchQuery("");
  }, [searchQuery]);

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
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
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
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
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
                  : "No products match your current filters"}
              </p>
              <button
                onClick={handleClearFilters}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear filters
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
