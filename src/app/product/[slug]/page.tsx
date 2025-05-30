"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Star, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGalleryEbay } from "@/components/product/product-gallery-ebay";
import { ProductActionsWrapper } from "@/components/product/product-actions-wrapper";
import { ProductDetails } from "@/components/product/product-details";
import { SimilarProducts } from "@/components/product/similar-products";
import { SellerProfileModal } from "@/components/product/seller-profile-modal";
import { ExploreHeaderEnhanced } from "@/components/explore/header/explore-header-enhanced";

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// This is mock data - replace with your actual data fetching logic
const getProductData = (slug: string) => {
  return {
    id: "1",
    title: "COACH CT721 Leather Soft Tabby 26 Shoulder Bag Crossbody Brown Outlet 26*15*13cm",
    slug: "coach-ct721-leather-bag",
    price: 119.0,
    originalPrice: 299.0,
    escrowFee: 15,
    location: "New York, NY",
    condition: "New with tags",
    description:
      "Coach CT721 Leather Soft Tabby Shoulder Bag Crossbody Brown Outlet. This authentic Coach bag features premium leather construction with signature hardware details. Perfect for everyday use with its versatile design that can be worn as a shoulder bag or crossbody.",
    images: [
      { id: "1", url: getPlaceholderImage(800, 800, "coach1"), alt: "Coach Bag - Main view" },
      { id: "2", url: getPlaceholderImage(800, 800, "coach2"), alt: "Coach Bag - Side view" },
      { id: "3", url: getPlaceholderImage(800, 800, "coach3"), alt: "Coach Bag - Interior view" },
      { id: "4", url: getPlaceholderImage(800, 800, "coach4"), alt: "Coach Bag - Detail view" },
      { id: "5", url: getPlaceholderImage(800, 800, "coach5"), alt: "Coach Bag - Back view" },
    ],
    variants: [
      {
        type: "Color",
        options: ["Brown", "Black", "Tan"],
      },
      {
        type: "Condition",
        options: ["New with tags", "Like New", "Good"],
      },
    ],
    seller: {
      id: "seller1",
      name: "BOYUANT",
      rating: 4.9,
      isVerified: true,
      totalSales: 1250,
      positivePercentage: 97.9,
      memberSince: "Nov 2011",
      location: "Los Angeles, CA",
      responseRate: 98,
      responseTime: "< 12 hours",
      reviews: {
        positive: 97,
        neutral: 2,
        negative: 1,
      },
    },
    ratings: {
      average: 5.0,
      count: 3,
      breakdown: [
        { stars: 5, count: 3 },
        { stars: 4, count: 0 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
      ],
    },
    details: [
      { label: "Brand", value: "Coach" },
      { label: "Model", value: "CT721" },
      { label: "Material", value: "Leather" },
      { label: "Color", value: "Brown" },
      { label: "Dimensions", value: "26*15*13cm" },
      { label: "Style", value: "Shoulder Bag" },
      { label: "Condition", value: "New with tags" },
      { label: "Authenticity", value: "Guaranteed Authentic" },
    ],
    features: [
      "Premium leather construction",
      "Signature Coach hardware",
      "Adjustable shoulder/crossbody strap",
      "Multiple interior compartments",
      "Magnetic snap closure",
      "Dust bag included",
    ],
    specifications: [
      { label: "Material", value: "100% Leather" },
      { label: "Lining", value: "Fabric" },
      { label: "Hardware", value: "Gold-tone" },
      { label: "Closure", value: "Magnetic snap" },
      { label: "Strap Drop", value: "22 inches" },
      { label: "Care Instructions", value: "Professional cleaning recommended" },
    ],
    similarProducts: [
      {
        id: "101",
        title: "Coach Leather Crossbody Bag Black",
        price: 89.99,
        escrowFee: 12,
        imageUrl: getPlaceholderImage(400, 400, "similar1"),
        slug: "coach-leather-crossbody-black",
        seller: { name: "Luxury Bags", isVerified: true },
        escrowStatus: "available" as const,
      },
      {
        id: "102",
        title: "Michael Kors Shoulder Bag Brown",
        price: 75.99,
        escrowFee: 10,
        imageUrl: getPlaceholderImage(400, 400, "similar2"),
        slug: "michael-kors-shoulder-bag-brown",
        seller: { name: "Designer Hub", isVerified: false },
        escrowStatus: "available" as const,
      },
      {
        id: "103",
        title: "Kate Spade Crossbody Bag",
        price: 95.99,
        escrowFee: 13,
        imageUrl: getPlaceholderImage(400, 400, "similar3"),
        slug: "kate-spade-crossbody-bag",
        seller: { name: "Fashion Outlet", isVerified: true },
        escrowStatus: "pending" as const,
      },
      {
        id: "104",
        title: "Tory Burch Leather Bag",
        price: 125.99,
        escrowFee: 16,
        imageUrl: getPlaceholderImage(400, 400, "similar4"),
        slug: "tory-burch-leather-bag",
        seller: { name: "Premium Bags", isVerified: true },
        escrowStatus: "available" as const,
      },
    ],
    breadcrumbs: [
      { name: "TrustLock", href: "/" },
      { name: "Fashion & Accessories", href: "/explore?category=fashion" },
      { name: "Women's Bags & Handbags", href: "/explore?category=bags" },
    ],
  };
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Use React.use() to unwrap the params promise
  const resolvedParams = use(params);
  const product = getProductData(resolvedParams.slug);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock handlers for header functionality
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // You can implement search functionality here
  };

  const handleFilterChange = (groupId: string, value: string) => {
    // You can implement filter functionality here
    console.log("Filter changed:", groupId, value);
  };

  const handleClearFilters = () => {
    // You can implement clear filters functionality here
    console.log("Filters cleared");
  };

  // Mock filters for the header
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
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Header - Same as explore page but without filters */}
      <ExploreHeaderEnhanced
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        filters={mockFilters}
        selectedFilters={{}}
        showFilters={false}
      />

      <div className="escrow-bg">
        {/* Breadcrumb Navigation */}
        <div className="diagonal-lines-subtle border-b border-border/30 bg-gradient-to-r from-[rgb(48,48,48)] to-[rgb(40,40,40)]">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {product.breadcrumbs.map((breadcrumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">›</span>}
                  <Link href={breadcrumb.href} className="hover:text-primary">
                    {breadcrumb.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Product Gallery - eBay Style */}
            <div className="lg:col-span-7">
              <ProductGalleryEbay images={product.images} />
            </div>

            {/* Product Info - eBay Style */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {/* Title and Actions */}
                <div className="flex items-start justify-between">
                  <h1 className="pr-4 text-2xl font-bold text-foreground">{product.title}</h1>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Ratings */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(product.ratings.average)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{product.ratings.average}</span>
                  </div>
                  <Link href="#reviews" className="text-primary hover:underline">
                    {product.ratings.count} product ratings
                  </Link>
                </div>

                {/* Seller Info */}
                <div className="flex items-center space-x-3 rounded-lg border border-border bg-card/30 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-semibold text-primary">
                      {product.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="link"
                        className="h-auto p-0 font-medium text-primary hover:underline"
                        onClick={() => setIsSellerModalOpen(true)}
                      >
                        {product.seller.name}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        ({product.seller.totalSales})
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.seller.positivePercentage}% positive feedback
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsSellerModalOpen(true)}>
                    View seller
                  </Button>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
                  {product.originalPrice && (
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )}
                        % off
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Returns and Condition */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Returns:</span>
                    <span className="text-sm">
                      No returns, but backed by{" "}
                      <Link href="#" className="text-primary hover:underline">
                        TrustLock Money back guarantee
                      </Link>
                      .
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Condition:</span>
                    <span className="text-sm">{product.condition}</span>
                  </div>
                </div>

                <Separator />

                {/* Product Actions */}
                <ProductActionsWrapper
                  variants={product.variants}
                  escrowFee={product.escrowFee}
                  price={product.price}
                  productId={product.id}
                />

                {/* Description Preview */}
                <div className="space-y-2">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <Link href="#description" className="text-sm text-primary hover:underline">
                    See full description
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12 bg-border/30" />

          {/* Product Details */}
          <ProductDetails
            details={product.details}
            description={product.description}
            features={product.features}
            specifications={product.specifications}
          />

          <Separator className="my-12 bg-border/30" />

          {/* Similar Products */}
          <SimilarProducts products={product.similarProducts} />
        </div>
      </div>

      {/* Seller Profile Modal */}
      <SellerProfileModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        seller={product.seller}
      />
    </div>
  );
}
