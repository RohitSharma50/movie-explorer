// shimmer/ skeleton
const SkeletonCard = () => {
  return (
    <div className="card animate-pulse">
      {/* Poster placeholder */}
      <div className="skeleton aspect-[2/3] w-full" />
      {/* Info placeholder */}
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
