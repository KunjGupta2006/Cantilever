import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export function TaskForm({ initialData, onSubmit, loading, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Title *
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          className="input-field"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-danger text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Description
        </label>
        <textarea
          {...register("description")}
          className="input-field min-h-[80px] resize-none"
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Priority
          </label>
          <select {...register("priority")} className="input-field">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading
            ? "Saving..."
            : initialData
            ? "Update Task"
            : "Create Task"}
        </button>
      </div>
    </form>
  );
}
