import Link from "next/link";
import Image from "next/image";
import { Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SimilarProduct {
  id: string;
  title: string;
  price: number;
  escrowFee: number;
  imageUrl: string;
  slug: string;
  seller: {
    name: string;
    isVerified: boolean;
  };
  escrowStatus: "available" | "pending" | "unavailable";
}

interface SimilarProductsProps {
  products: SimilarProduct[];
  className?: string;
}

export function SimilarProducts({ products, className }: SimilarProductsProps) {
  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Similar Products</h2>
        <Link href="/explore" className="text-sm text-primary hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="diagonal-lines-subtle overflow-hidden border-border bg-card/30 transition-all hover:bg-card/50"
          >
            <Link href={`/products/${product.slug}`} className="relative block aspect-square">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full border border-border bg-card/80 backdrop-blur-sm"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              {product.escrowStatus === "available" && (
                <Badge className="absolute left-2 top-2 bg-primary/90 text-primary-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  Escrow
                </Badge>
              )}
            </Link>
            <CardContent className="p-4">
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="line-clamp-2 font-medium text-foreground transition-colors hover:text-primary">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold text-primary">${product.price.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">+${product.escrowFee} escrow</div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  by {product.seller.name}
                  {product.seller.isVerified && (
                    <Badge variant="secondary" className="ml-1 bg-primary/10 text-xs text-primary">
                      Verified
                    </Badge>
                  )}
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
