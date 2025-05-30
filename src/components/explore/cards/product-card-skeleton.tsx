export function ProductCardSkeleton() {
  return (
    <div className="diagonal-lines-subtle overflow-hidden rounded-lg border border-border bg-card/30 shadow-lg">
      {/* Image skeleton with shimmer effect */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[rgb(40,40,40)]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[rgb(40,40,40)] via-[rgb(48,48,48)] to-[rgb(40,40,40)]">
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        {/* Status badge skeleton */}
        <div className="absolute left-2 top-2 h-6 w-16 animate-pulse rounded-full bg-[rgb(48,48,48)]"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 p-4">
        {/* Title skeleton with staggered lines */}
        <div className="space-y-2">
          <div className="h-4 animate-pulse rounded bg-[rgb(48,48,48)]"></div>
          <div className="h-4 w-4/5 animate-pulse rounded bg-[rgb(48,48,48)]"></div>
        </div>

        {/* Price section skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-6 w-20 animate-pulse rounded bg-[rgb(48,48,48)]"></div>
            <div className="h-3 w-16 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
          </div>
          <div className="h-4 w-12 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
        </div>

        {/* Seller info skeleton */}
        <div className="flex items-center space-x-3 border-t border-border/30 pt-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[rgb(48,48,48)]"></div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-16 animate-pulse rounded bg-[rgb(48,48,48)]"></div>
              <div className="h-3 w-12 animate-pulse rounded bg-primary/20"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 animate-pulse rounded bg-primary/30"></div>
              <div className="h-3 w-8 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
            </div>
          </div>
        </div>

        {/* Location and escrow info skeleton */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
            <div className="h-3 w-24 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
          </div>

          <div className="flex items-center justify-between border-t border-border/30 pt-2">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 animate-pulse rounded bg-primary/30"></div>
              <div className="h-3 w-20 animate-pulse rounded bg-[rgb(45,45,45)]"></div>
            </div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
