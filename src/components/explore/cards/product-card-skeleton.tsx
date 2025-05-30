export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] animate-pulse bg-gray-700">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 p-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 animate-pulse rounded bg-gray-700"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>
        </div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-700"></div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-700"></div>
        </div>

        {/* Seller info skeleton */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700"></div>
          <div className="flex-1 space-y-1">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-700"></div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-12 animate-pulse rounded bg-gray-700"></div>
              <div className="h-3 w-8 animate-pulse rounded bg-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Location skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-700"></div>
          <div className="h-3 w-32 animate-pulse rounded bg-gray-700"></div>
        </div>

        {/* Escrow status skeleton */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-700"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
