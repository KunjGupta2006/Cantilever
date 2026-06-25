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
      status: "todo",
      dueDate: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="input-field"
          placeholder="What needs to be done?"
        />
        {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Description</label>
        <textarea
          {...register("description")}
          className="input-field min-h-[80px] resize-none"
          placeholder="Add details (optional)"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Priority</label>
          <select {...register("priority")} className="input-field">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Status</label>
          <select {...register("status")} className="input-field">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Due Date</label>
          <input type="date" {...register("dueDate")} className="input-field" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
        )}
        <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving..." : initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
