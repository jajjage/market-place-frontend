import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductActionsWrapper } from "@/components/product/product-actions-wrapper";
import { ProductDetails } from "@/components/product/product-details";
import { SimilarProducts } from "@/components/product/similar-products";
import { Separator } from "@/components/ui/separator";
import { MasonryGrid } from "@/components/ui/masonry-grid";

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// This is mock data - replace with your actual data fetching logic
const getProductData = (slug: string) => {
  return {
    id: "1",
    title: "Nike Air Force 1 '07 Low Triple White",
    slug: "nike-air-force-1-triple-white",
    price: 67.99,
    originalPrice: 89.99,
    escrowFee: 10,
    location: "New York, NY",
    description:
      "The Nike Air Force 1 '07 brings you a timeless classic with a fresh perspective. This iconic silhouette features premium leather construction, perforated toe box for breathability, and the legendary Air-Sole unit for lightweight cushioning. Perfect for everyday wear with its versatile white colorway that pairs with any outfit.",
    images: [
      { id: "1", url: getPlaceholderImage(600, 600, "nike1"), alt: "Nike Air Force 1 - Main view" },
      { id: "2", url: getPlaceholderImage(600, 600, "nike2"), alt: "Nike Air Force 1 - Side view" },
      { id: "3", url: getPlaceholderImage(600, 600, "nike3"), alt: "Nike Air Force 1 - Back view" },
      {
        id: "4",
        url: getPlaceholderImage(600, 600, "nike4"),
        alt: "Nike Air Force 1 - Detail view",
      },
    ],
    variants: [
      {
        type: "Size",
        options: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      },
      {
        type: "Condition",
        options: ["New", "Like New", "Good"],
      },
    ],
    seller: {
      name: "Sneaker Shop",
      rating: 4.8,
      isVerified: true,
      totalSales: 1250,
    },
    details: [
      { label: "Brand", value: "Nike" },
      { label: "Model", value: "Air Force 1 '07" },
      { label: "Colorway", value: "Triple White" },
      { label: "Material", value: "Leather" },
      { label: "Release Year", value: "2007" },
      { label: "Style Code", value: "315122-111" },
      { label: "Condition", value: "New with Box" },
      { label: "Authenticity", value: "Verified Authentic" },
    ],
    features: [
      "Premium leather upper for durability and style",
      "Perforated toe box for enhanced breathability",
      "Air-Sole unit in heel for lightweight cushioning",
      "Rubber outsole with pivot points for traction",
      "Classic basketball silhouette with modern comfort",
      "Versatile white colorway matches any outfit",
    ],
    specifications: [
      { label: "Upper Material", value: "Full-grain leather" },
      { label: "Midsole", value: "Polyurethane with Air-Sole unit" },
      { label: "Outsole", value: "Solid rubber with pivot points" },
      { label: "Closure", value: "Lace-up" },
      { label: "Weight", value: "Approximately 1.2 lbs (per shoe)" },
      { label: "Country of Origin", value: "Vietnam" },
    ],
    similarProducts: [
      {
        id: "101",
        title: "Nike Air Force 1 '07 Black",
        price: 65.99,
        escrowFee: 10,
        imageUrl: getPlaceholderImage(400, 400, "similar1"),
        image: getPlaceholderImage(400, 400, "similar1"),
        slug: "nike-air-force-1-black",
        seller: { name: "Kicks Central", isVerified: true },
        escrowStatus: "available" as const,
        location: "Los Angeles, CA",
      },
      {
        id: "102",
        title: "Adidas Stan Smith White Green",
        price: 55.99,
        escrowFee: 8,
        imageUrl: getPlaceholderImage(400, 400, "similar2"),
        image: getPlaceholderImage(400, 400, "similar2"),
        slug: "adidas-stan-smith-white-green",
        seller: { name: "Sneaker Hub", isVerified: false },
        escrowStatus: "available" as const,
        location: "Chicago, IL",
      },
      {
        id: "103",
        title: "Converse Chuck Taylor All Star",
        price: 45.99,
        escrowFee: 7,
        imageUrl: getPlaceholderImage(400, 400, "similar3"),
        image: getPlaceholderImage(400, 400, "similar3"),
        slug: "converse-chuck-taylor-all-star",
        seller: { name: "Classic Shoes", isVerified: true },
        escrowStatus: "pending" as const,
        location: "Houston, TX",
      },
      {
        id: "104",
        title: "Vans Old Skool Black White",
        price: 49.99,
        escrowFee: 8,
        imageUrl: getPlaceholderImage(400, 400, "similar4"),
        image: getPlaceholderImage(400, 400, "similar4"),
        slug: "vans-old-skool-black-white",
        seller: { name: "Skate Shop", isVerified: true },
        escrowStatus: "available" as const,
        location: "San Francisco, CA",
      },
    ],
  };
};

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.slug);

  return (
    <div className="escrow-bg min-h-screen">
      {/* Header with back button */}
      <div className="diagonal-lines-subtle border-b border-border/30 bg-gradient-to-r from-[rgb(48,48,48)] to-[rgb(40,40,40)]">
        <div className="container mx-auto px-4 py-4">
          <Link href="/explore">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Gallery */}
          <div className="lg:col-span-1">
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <ProductInfo
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              escrowFee={product.escrowFee}
              seller={product.seller}
              location={product.location}
              description={product.description}
            />
          </div>

          {/* Product Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductActionsWrapper
                variants={product.variants}
                escrowFee={product.escrowFee}
                price={product.price}
                productId={product.id}
              />
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
        <div className="min-w-0 flex-1">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-white">Explore Products</h2>
            <p className="text-gray-400">
              {product.similarProducts.length} products available with escrow protection
            </p>
          </div>
          <MasonryGrid>
            {product.similarProducts.map((product) => (
              <div key={product.id} className="mb-6">
                <SimilarProducts {...product} />
              </div>
            ))}
          </MasonryGrid>
        </div>
      </div>
    </div>
  );
}
