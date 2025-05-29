import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Star, User } from "lucide-react";

interface SimilarProductsProps {
  id: string;
  title: string;
  price: number;
  escrowFee: number;
  image: string;
  seller: {
    name: string;
    rating?: number;
    isVerified: boolean;
  };
  location: string;
  escrowStatus: "available" | "in-progress" | "completed" | "pending";
}

export function SimilarProducts({
  id,
  title,
  price,
  escrowFee,
  image,
  seller,
  location,
  escrowStatus,
}: SimilarProductsProps) {
  const statusColors = {
    available: "bg-[rgba(143,242,93,0.1)] text-[rgb(143,242,93)]",
    pending: "bg-[rgba(255,171,64,0.1)] text-[rgb(255,171,64)]",
    "in-progress": "bg-[rgba(144,202,249,0.1)] text-[rgb(144,202,249)]",
    completed: "bg-[rgba(159,168,218,0.1)] text-[rgb(159,168,218)]",
  };

  return (
    <Link href={`/product/${id}`}>
      <Card className="group overflow-hidden rounded-xl border-[rgba(255,255,255,0.1)] bg-[rgb(48,48,48)] transition-all duration-200 hover:scale-[1.02] hover:border-[rgb(143,242,93)] hover:shadow-[0_0_15px_rgba(143,242,93,0.15)]">
        <div className="relative aspect-square overflow-hidden bg-[rgb(31,31,31)]">
          <Image
            src={image}
            alt={title}
            fill
            className="transform object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={`absolute left-3 top-3 ${statusColors[escrowStatus]} capitalize shadow-sm`}
          >
            {escrowStatus.replace("-", " ")}
          </Badge>
        </div>
        <CardContent className="space-y-3 p-4">
          {/* Product Title */}
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-white">{title}</h3>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-[rgb(143,242,93)]">${price.toFixed(2)}</span>
              <span className="text-xs text-gray-400">+${escrowFee.toFixed(2)} escrow</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.1)] pt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">{seller.name}</span>
              {seller.isVerified && <Shield className="h-4 w-4 text-[rgb(143,242,93)]" />}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[rgb(143,242,93)] text-[rgb(143,242,93)]" />
              <span className="text-gray-300">{seller.rating?.toFixed(1)}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
