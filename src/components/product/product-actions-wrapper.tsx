"use client";

import { ProductActions } from "@/components/product/product-actions";

interface ProductActionsWrapperProps {
  variants?: {
    type: string;
    options: string[];
  }[];
  escrowFee: number;
  price: number;
  productId: string;
}

export function ProductActionsWrapper({
  variants,
  escrowFee,
  price,
  productId,
}: ProductActionsWrapperProps) {
  const handleStartEscrow = (quantity: number, options: Record<string, string>) => {
    console.log("Starting escrow:", { quantity, options, product: productId });
    // Add your escrow logic here
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", productId);
    // Add your wishlist logic here
  };

  const handleContactSeller = () => {
    console.log("Contacting seller for product:", productId);
    // Add your contact seller logic here
  };

  return (
    <ProductActions
      variants={variants}
      escrowFee={escrowFee}
      price={price}
      onStartEscrow={handleStartEscrow}
      onAddToWishlist={handleAddToWishlist}
      onContactSeller={handleContactSeller}
    />
  );
}
