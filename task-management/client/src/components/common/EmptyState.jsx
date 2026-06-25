import { ClipboardList } from "lucide-react";

export function EmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">
        No Tasks Found
      </h3>
      <p className="text-text-secondary text-sm mb-6 text-center max-w-sm">
        Create your first task to get started.
      </p>
      {onCreate && (
        <button onClick={onCreate} className="btn-primary">
          Create Task
        </button>
      )}
    </div>
  );
}
