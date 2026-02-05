interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'skeleton animate-shimmer';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

// Pre-built skeleton layouts for weather components
export function WeatherSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* City name skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-8 w-48" variant="text" />
      </div>
      
      {/* Temperature skeleton */}
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-24 h-24" variant="circular" />
        <Skeleton className="h-16 w-32" variant="text" />
        <Skeleton className="h-6 w-40" variant="text" />
      </div>
      
      {/* Details skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4">
            <Skeleton className="h-4 w-16 mb-2" variant="text" />
            <Skeleton className="h-6 w-12" variant="text" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass-card p-4 min-w-[120px] flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-12" variant="text" />
          <Skeleton className="w-12 h-12" variant="circular" />
          <Skeleton className="h-4 w-16" variant="text" />
        </div>
      ))}
    </div>
  );
}
