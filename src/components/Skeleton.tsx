export default function SkeletonCard({ width = '100%', height = 80 }: { width?: string | number; height?: string | number }) {
  return (
    <div className="skeleton" style={{ width, height }} aria-hidden>
      <div className="skeleton-shimmer" />
    </div>
  )
}
