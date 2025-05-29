import { MasonryGrid } from "@/components/ui/masonry-grid";
import { ExploreFilters } from "./components/explore-filters";
import { ExploreHeader } from "./components/explore-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TrustIndicators } from "@/components/explore/sections/trust-indicators";
import { ProductCard } from "@/components/explore/cards/product-card";

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export default function ExplorePage() {
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
        { id: "0-50", label: "Under $50" },
        { id: "50-100", label: "$50 - $100" },
        { id: "100-500", label: "$100 - $500" },
        { id: "500+", label: "Over $500" },
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

  const mockProducts = [
    {
      id: "product-1",
      title: "Nike Air Force 1 '07 Low Triple White",
      price: 67.99,
      escrowFee: 10,
      image: getPlaceholderImage(600, 400, "product1"),
      seller: {
        name: "Sneaker Shop",
        rating: 4.8,
        isVerified: true,
      },
      location: "New York, NY",
      escrowStatus: "available" as const,
    },
    {
      id: "product-2",
      title: "Nike SB x Air Jordan 4 Retro SP Navy",
      price: 105.0,
      escrowFee: 15,
      image: getPlaceholderImage(600, 400, "product2"),
      seller: {
        name: "Premium Kicks",
        rating: 4.5,
        isVerified: true,
      },
      location: "Los Angeles, CA",
      escrowStatus: "available" as const,
    },
    {
      id: "product-3",
      title: "PlayStation 5 Digital Edition",
      price: 399.99,
      escrowFee: 25,
      image: getPlaceholderImage(600, 400, "product3"),
      seller: {
        name: "GameStop",
        rating: 4.9,
        isVerified: true,
      },
      location: "Chicago, IL",
      escrowStatus: "pending" as const,
    },
    {
      id: "product-4",
      title: "MacBook Pro M2 13-inch",
      price: 1299.99,
      escrowFee: 50,
      image: getPlaceholderImage(600, 400, "product4"),
      seller: {
        name: "Tech Deals",
        rating: 4.7,
        isVerified: true,
      },
      location: "San Francisco, CA",
      escrowStatus: "available" as const,
    },
    {
      id: "product-5",
      title: "iPhone 14 Pro Max 256GB",
      price: 999.99,
      escrowFee: 35,
      image: getPlaceholderImage(600, 400, "product5"),
      seller: {
        name: "Mobile Hub",
        rating: 4.6,
        isVerified: false,
      },
      location: "Miami, FL",
      escrowStatus: "available" as const,
    },
    {
      id: "product-6",
      title: 'Samsung 65" QLED 4K Smart TV',
      price: 899.99,
      escrowFee: 40,
      image: getPlaceholderImage(600, 400, "product6"),
      seller: {
        name: "Electronics Pro",
        rating: 4.4,
        isVerified: true,
      },
      location: "Houston, TX",
      escrowStatus: "available" as const,
    },
  ];

  const mockStats = {
    totalTransactions: 50000,
    verifiedSellers: 15000,
    moneyProtected: 25000000,
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(31,31,31)]">
        <ExploreHeader />

        {/* Trust Indicators Section */}
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

        {/* Main Content Section */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-32">
                <ExploreFilters filters={mockFilters} />
              </div>
            </aside>

            {/* Products Grid with Masonry Layout */}
            <div className="min-w-0 flex-1">
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold text-white">Explore Products</h2>
                <p className="text-gray-400">
                  {mockProducts.length} products available with escrow protection
                </p>
              </div>

              <MasonryGrid>
                {mockProducts.map((product) => (
                  <div key={product.id} className="mb-6">
                    <ProductCard {...product} />
                  </div>
                ))}
              </MasonryGrid>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
