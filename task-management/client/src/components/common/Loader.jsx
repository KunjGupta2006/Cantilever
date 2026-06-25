import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-text-secondary text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between pt-2">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}
