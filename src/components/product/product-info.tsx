import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, MapPin, Star } from "lucide-react";

interface Seller {
  name: string;
  rating: number;
  isVerified: boolean;
  totalSales?: number;
}

interface ProductInfoProps {
  title: string;
  price: number;
  originalPrice?: number;
  escrowFee: number;
  seller: Seller;
  location: string;
  description: string;
  className?: string;
}

export function ProductInfo({
  title,
  price,
  originalPrice,
  escrowFee,
  seller,
  location,
  description,
  className,
}: ProductInfoProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-primary">${price.toFixed(2)}</div>
            {originalPrice && (
              <>
                <div className="text-lg text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {discount}% off
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="diagonal-lines-subtle rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Escrow Protection Available
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Escrow fee: ${escrowFee.toFixed(2)} • Your money is protected until you receive the item
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Seller Information</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {seller.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{seller.name}</span>
                  {seller.isVerified && (
                    <Badge variant="secondary" className="bg-primary/10 text-xs text-primary">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{seller.rating.toFixed(1)}</span>
                  {seller.totalSales && <span>• {seller.totalSales} sales</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
