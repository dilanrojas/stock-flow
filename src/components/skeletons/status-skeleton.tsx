interface StatusSkeletonProps {
  count?: number;
}

export default function StatusSkeleton({ count = 3 }: StatusSkeletonProps) {
  return (
    <div className='flex gap-2'>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='flex-1 h-24 rounded-lg bg-gray-200 animate-pulse'
        />
      ))}
    </div>
  );
}