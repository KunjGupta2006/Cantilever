import { Loader2 } from "lucide-react";

export function ButtonLoader() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

export function SkeletonCard() {
  return (
    <div className="card p-4 space-y-2">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );
}
