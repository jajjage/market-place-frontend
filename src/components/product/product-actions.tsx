"use client";

import { useState } from "react";
import { Heart, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductActionsProps {
  variants?: {
    type: string;
    options: string[];
  }[];
  escrowFee: number;
  price: number;
  onStartEscrow?: (quantity: number, selectedOptions: Record<string, string>) => void;
  onAddToWishlist?: () => void;
  onContactSeller?: () => void;
  className?: string;
}

export function ProductActions({
  variants = [],
  escrowFee,
  price,
  onStartEscrow,
  onAddToWishlist,
  onContactSeller,
  className,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionChange = (type: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: value }));
  };

  const handleStartEscrow = () => {
    if (onStartEscrow) {
      onStartEscrow(quantity, selectedOptions);
    }
  };

  const totalPrice = price * quantity;
  const totalEscrowFee = escrowFee * quantity;

  return (
    <div className={className}>
      <Card className="diagonal-lines-subtle border-border bg-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Secure Purchase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant) => (
            <div key={variant.type}>
              <Label htmlFor={variant.type} className="text-sm font-medium text-foreground">
                {variant.type}
              </Label>
              <Select
                onValueChange={(value) => handleOptionChange(variant.type, value)}
                defaultValue={variant.options[0]}
              >
                <SelectTrigger id={variant.type} className="mt-1">
                  <SelectValue placeholder={`Select ${variant.type}`} />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div>
            <Label htmlFor="quantity" className="text-sm font-medium text-foreground">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="mt-1 w-24"
            />
          </div>

          <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Item total:</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Escrow fee:</span>
              <span className="font-medium">${totalEscrowFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold">
              <span>Total:</span>
              <span className="text-primary">${(totalPrice + totalEscrowFee).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button size="lg" className="w-full" onClick={handleStartEscrow}>
              <Shield className="mr-2 h-4 w-4" />
              Start Escrow Transaction
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={onContactSeller}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Seller
              </Button>
              <Button size="sm" variant="outline" onClick={onAddToWishlist}>
                <Heart className="mr-2 h-4 w-4" />
                Save Item
              </Button>
            </div>
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-primary" />
              <span>Your payment is held securely until delivery</span>
            </div>
            <div>• Seller gets paid only after you confirm receipt</div>
            <div>• Full refund if item doesn't match description</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
