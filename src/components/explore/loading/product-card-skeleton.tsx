import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square w-full animate-pulse bg-gray-200">
        <div className="absolute right-2 top-2 h-6 w-16 animate-pulse rounded-full bg-gray-300"></div>
      </div>
      <CardContent className="space-y-2.5 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
