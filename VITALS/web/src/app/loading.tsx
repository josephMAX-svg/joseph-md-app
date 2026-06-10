export default function Loading() {
  const Block = ({ className }: { className: string }) => (
    <div className={`mv-shimmer rounded-2xl bg-bg-subtle ${className}`} />
  );
  return (
    <div className="space-y-4 pt-2">
      <Block className="h-6 w-32 rounded-lg" />
      <Block className="h-28" />
      <div className="grid grid-cols-2 gap-3">
        <Block className="h-24" />
        <Block className="h-24" />
      </div>
      <Block className="h-20" />
      <Block className="h-32" />
    </div>
  );
}
