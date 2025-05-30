"use client";

import { useState } from "react";
import { X, Star, Shield, Award, CheckCircle, Clock, Package, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SellerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    isVerified: boolean;
    positivePercentage: number;
    memberSince: string;
    totalSales?: number;
    location?: string;
    responseRate?: number;
    responseTime?: string;
    reviews?: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
}

export function SellerProfileModal({ isOpen, onClose, seller }: SellerProfileModalProps) {
  const [activeTab, setActiveTab] = useState("about");

  if (!isOpen) return null;

  // Mock data for seller stats
  const sellerStats = {
    itemsForSale: 124,
    completedSales: seller.totalSales || 1250,
    averageShippingTime: "2 days",
    disputeRate: "0.5%",
    recentFeedback: [
      {
        id: "1",
        rating: 5,
        comment: "Great seller, fast shipping and item exactly as described!",
        date: "2 days ago",
        buyer: "j***r",
      },
      {
        id: "2",
        rating: 5,
        comment: "Perfect transaction. Would buy from again!",
        date: "1 week ago",
        buyer: "t***s",
      },
      {
        id: "3",
        rating: 5,
        comment: "Item arrived quickly and was well packaged. Very satisfied!",
        date: "2 weeks ago",
        buyer: "m***e",
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="diagonal-lines-subtle relative z-10 max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-border bg-gradient-to-b from-[rgb(48,48,48)] to-[rgb(40,40,40)] shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-[rgb(48,48,48)] to-[rgb(40,40,40)] p-4">
          <h2 className="text-xl font-bold">Seller Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Seller Overview */}
        <div className="border-b border-border/30 p-6">
          <div className="flex items-start gap-6">
            {/* Seller Avatar */}
            <div className="flex-shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10">
                {seller.avatar ? (
                  <img
                    src={seller.avatar || "/placeholder.svg"}
                    alt={seller.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary">
                    {seller.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {seller.isVerified && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-primary p-1">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{seller.name}</h3>
                {seller.isVerified && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Verified Seller
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(seller.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{seller.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {seller.positivePercentage}% Positive Feedback ({sellerStats.completedSales}{" "}
                  sales)
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Member since {seller.memberSince}</span>
                </div>
                {seller.location && (
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>Ships from {seller.location}</span>
                  </div>
                )}
                {seller.responseRate && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {seller.responseRate}% response rate ({seller.responseTime || "< 24 hours"})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex-shrink-0">
              <Button>
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Seller
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="items">Items for Sale</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="diagonal-lines-subtle border-border bg-card/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Seller Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Items for Sale</span>
                    <span className="font-medium">{sellerStats.itemsForSale}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completed Sales</span>
                    <span className="font-medium">{sellerStats.completedSales}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Shipping Time</span>
                    <span className="font-medium">{sellerStats.averageShippingTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Dispute Rate</span>
                    <span className="font-medium">{sellerStats.disputeRate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="diagonal-lines-subtle border-border bg-card/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Seller Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Item as Described</span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <Progress value={98} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Communication</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <Progress value={96} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Shipping Speed</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <Progress value={94} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Shipping Costs</span>
                      <span className="font-medium">4.6/5</span>
                    </div>
                    <Progress value={92} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="diagonal-lines-subtle border-border bg-card/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Seller Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-primary/10 py-1.5 text-primary"
                  >
                    <Award className="h-3 w-3" />
                    Top Rated Seller
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-primary/10 py-1.5 text-primary"
                  >
                    <Shield className="h-3 w-3" />
                    Trusted Escrow Partner
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-primary/10 py-1.5 text-primary"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Fast Shipper
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-primary/10 py-1.5 text-primary"
                  >
                    <Star className="h-3 w-3" />
                    1000+ Sales
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6 pt-4">
            <Card className="diagonal-lines-subtle border-border bg-card/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Feedback Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 text-center">
                    <div className="text-3xl font-bold text-primary">
                      {seller.positivePercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">Positive Feedback</div>
                  </div>

                  <div className="col-span-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-sm text-muted-foreground">Positive</span>
                      <Progress
                        value={seller.reviews?.positive || 97}
                        className="h-2 flex-1"
                        // indicatorClassName="bg-green-500"
                      />
                      <span className="w-10 text-right text-sm">
                        {seller.reviews?.positive || 97}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-sm text-muted-foreground">Neutral</span>
                      <Progress
                        value={seller.reviews?.neutral || 2}
                        className="h-2 flex-1"
                        // indicatorClassName="bg-yellow-500"
                      />
                      <span className="w-10 text-right text-sm">
                        {seller.reviews?.neutral || 2}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-sm text-muted-foreground">Negative</span>
                      <Progress
                        value={seller.reviews?.negative || 1}
                        className="h-2 flex-1"
                        // indicatorClassName="bg-red-500"
                      />
                      <span className="w-10 text-right text-sm">
                        {seller.reviews?.negative || 1}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="diagonal-lines-subtle border-border bg-card/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sellerStats.recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            feedback.rating >= 4
                              ? "bg-green-500"
                              : feedback.rating >= 3
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          )}
                        />
                        <span className="font-medium">{feedback.buyer}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{feedback.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                    <Separator className="bg-border/30" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="diagonal-lines-subtle overflow-hidden border-border bg-card/30"
                >
                  <div className="relative aspect-square">
                    <img
                      src={getPlaceholderImage(300, 300, `seller-item-${i || "/placeholder.svg"}`)}
                      alt={`Item ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <Badge
                      className="absolute left-2 top-2 bg-primary/90 text-primary-foreground"
                      variant="secondary"
                    >
                      ${(Math.random() * 100 + 20).toFixed(2)}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="line-clamp-2 font-medium">
                      {[
                        "Vintage Leather Wallet",
                        "Designer Sunglasses",
                        "Wireless Earbuds",
                        "Smartphone Case",
                        "Fitness Tracker",
                        "Bluetooth Speaker",
                        "Laptop Sleeve",
                        "Portable Charger",
                      ][i % 8] + ` (Item ${i + 1})`}
                    </h4>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3 w-3 ${
                              j < Math.floor(Math.random() * 2) + 4
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 50) + 1} sold
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">View All Items</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper function for placeholder images
const getPlaceholderImage = (width = 600, height = 400, seed = "default") => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};
