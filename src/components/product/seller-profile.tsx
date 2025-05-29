import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SellerInfoProps {
  name: string;
  rating: number;
  totalRatings: number;
  positivePercentage: number;
  joinDate: string;
  description?: string;
  className?: string;
}

export function SellerInfo({
  name,
  rating,
  totalRatings,
  positivePercentage,
  joinDate,
  description,
  className,
}: SellerInfoProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">About this seller</h3>

        <div className="mt-4">
          <div className="font-medium">{name}</div>
          <div className="mt-1 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(rating)
                      ? "fill-primary text-primary"
                      : "fill-muted stroke-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({totalRatings.toLocaleString()})
            </span>
          </div>

          <div className="mt-2 text-sm">
            <div className="flex items-center justify-between">
              <span>{positivePercentage}% Positive feedback</span>
            </div>
            <Progress value={positivePercentage} className="mt-1 h-1" />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">Joined {joinDate}</div>

          {description && <div className="mt-4 text-sm">{description}</div>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t p-4">
        <Button variant="outline" className="w-full">
          Contact seller
        </Button>
        <Button variant="outline" className="w-full">
          Visit store
        </Button>
      </CardFooter>
    </Card>
  );
}
