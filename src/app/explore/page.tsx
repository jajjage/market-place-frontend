import { headers } from "next/headers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TrustIndicators } from "@/components/explore/sections/trust-indicators";
import { ProductsWrapper } from "./components/products-wrapper";
import productService from "@/services/product-service";
import type { Product, ProductFilters, ProductListResponse } from "@/types/product";

interface ExplorePageProps {
  searchParams: {
    search?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    has_discount?: string;
    page?: string;
    [key: string]: string | undefined;
  };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await Promise.resolve(searchParams);

  // Convert search params to filters, using optional chaining and nullish coalescing for safety
  const filters: ProductFilters = {
    search: params.search ?? undefined,
    category_name: params.category ?? undefined,
    has_discount: params.has_discount === "true" ? true : undefined,
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
    page: params.page ? Number(params.page) : 1,
    page_size: 20,
  };

  // Server-side data fetching for initial load and SEO
  let initialProducts: Product[] = [];
  let initialError = null;

  let extraHeaders = {};
  if (typeof window === "undefined") {
    const cookieHeader = (await headers()).get("cookie") || "";
    if (cookieHeader) {
      extraHeaders = { Cookie: cookieHeader };
    }
  }

  try {
    const productsData = (await productService.getProducts(
      filters,
      extraHeaders
    )) as ProductListResponse;
    initialProducts = productsData?.data || [];
  } catch (error: any) {
    console.error("Failed to fetch initial products:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });
    initialError = {
      message: error.message,
      code: error.code,
      isConnectionError: error.code === "ECONNREFUSED",
    };
  }

  const mockFilters = [
    {
      id: "category",
      title: "Category",
      options: [
        { id: "electronics", label: "Electronics" },
        { id: "fashion", label: "Fashion" },
        { id: "home", label: "Home & Garden" },
        { id: "sports", label: "Sports" },
      ],
    },
    {
      id: "price",
      title: "Price Range",
      options: [
        { id: "0-50", label: "Under $50", min_price: 0, max_price: 50 },
        { id: "50-100", label: "$50 - $100", min_price: 50, max_price: 100 },
        { id: "100-500", label: "$100 - $500", min_price: 100, max_price: 500 },
        { id: "500+", label: "Over $500", min_price: 500 },
      ],
    },
    {
      id: "seller",
      title: "Seller Type",
      options: [
        { id: "verified", label: "Verified Sellers" },
        { id: "top-rated", label: "Top Rated" },
        { id: "local", label: "Local Sellers" },
      ],
    },
  ];

  const mockStats = {
    totalTransactions: 50000,
    verifiedSellers: 15000,
    moneyProtected: 25000000,
  };

  return (
    <TooltipProvider>
      <ProductsWrapper
        initialProducts={initialProducts}
        initialFilters={filters}
        mockFilters={mockFilters}
      />

      {/* Trust Indicators Section - moved inside ProductsWrapper or can be added here */}
      <section className="border-b border-gray-600/30 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <TrustIndicators
            stats={{
              totalTransactions: 0,
              verifiedSellers: 0,
              moneyProtected: 0,
            }}
            {...mockStats}
          />
        </div>
      </section>
    </TooltipProvider>
  );
}
