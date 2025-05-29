import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
  className,
}: ProductReviewsProps) {
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });

  return (
    <div className={className}>
      <h2 className="text-xl font-bold">Customer Reviews</h2>

      <div className="mt-4 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="mt-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.round(averageRating)
                      ? "fill-primary text-primary"
                      : "fill-muted stroke-muted-foreground"
                  )}
                />
              ))}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-2">{rating}</div>
                <Progress
                  value={totalReviews > 0 ? (ratingCounts[5 - rating] / totalReviews) * 100 : 0}
                  className="h-2"
                />
                <div className="w-8 text-xs text-muted-foreground">{ratingCounts[5 - rating]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{review.author}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
                <div className="mt-1 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted stroke-muted-foreground"
                      )}
                    />
                  ))}
                  {review.verified && (
                    <span className="ml-2 text-xs text-muted-foreground">Verified Purchase</span>
                  )}
                </div>
                <div className="mt-2 text-sm">{review.content}</div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
