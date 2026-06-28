import { useState } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Plus, Clock, Circle, CheckCircle2 } from "lucide-react";
import { TaskCardCompact } from "./TaskCardCompact";

const columns = [
  { id: "todo", title: "To Do", icon: Clock, color: "text-warning", bg: "bg-warning/5" },
  { id: "in-progress", title: "In Progress", icon: Circle, color: "text-accent", bg: "bg-accent/5" },
  { id: "completed", title: "Completed", icon: CheckCircle2, color: "text-success", bg: "bg-success/5" },
];

export function BoardView({ tasks, onEdit, onDelete, onToggleStatus, onStatusChange }) {
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const getTasksByStatus = (status) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveTask(null);

    if (!over) return;

    const activeTaskData = tasks.find((t) => t._id === active.id);
    if (!activeTaskData) return;

    const overColumn = over.id;

    if (["todo", "in-progress", "completed"].includes(overColumn)) {
      if (activeTaskData.status !== overColumn) {
        onStatusChange?.(activeTaskData._id, overColumn);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = getTasksByStatus(col.id);
          const Icon = col.icon;

          return (
            <div key={col.id} className={`rounded-card border border-border dark:border-border-dark ${col.bg} p-3`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${col.color}`} />
                  <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">{col.title}</h3>
                </div>
                <span className="text-xs text-text-secondary dark:text-text-secondary-dark font-medium bg-surface dark:bg-surface-dark px-2 py-0.5 rounded-md">
                  {colTasks.length}
                </span>
              </div>

              <SortableContext items={colTasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 min-h-[120px]" id={col.id}>
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-xs text-text-secondary/50 dark:text-text-secondary-dark/50">No tasks</p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <TaskCardCompact
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleStatus={onToggleStatus}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="card p-3.5 shadow-strong opacity-90">
            <h4 className="text-sm font-medium">{activeTask.title}</h4>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
