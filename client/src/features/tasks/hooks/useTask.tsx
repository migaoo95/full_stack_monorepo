import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTaskDB } from "../api";
import type { Task } from "../schemas/taskSchema";

type OperationLoading = {
  fetching: boolean;
  creating: boolean;
  updating: Set<string>;
  deleting: Set<string>;
};

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [operationLoading, setOperationLoading] = useState<OperationLoading>({
    fetching: false,
    creating: false,
    updating: new Set(),
    deleting: new Set(),
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setOperationLoading((prev) => ({ ...prev, fetching: true }));

      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setOperationLoading((prev) => ({ ...prev, fetching: false }));
      }
    };

    fetchData();
  }, []);

  const addTask = async (title: string) => {
    setOperationLoading((prev) => ({ ...prev, creating: true }));
    const tempId = `temp-${Date.now()}`;
    const tempTask: Task = {
      id: tempId,
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, tempTask]);

    try {
      const realTask = await createTask(title);

      setTasks((prev) => prev.map((t) => (t.id === tempId ? realTask : t)));
    } catch (error) {
      console.error(error, "My error");
      setError((error as Error).message);
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      throw error;
    } finally {
      setOperationLoading((prev) => ({ ...prev, creating: false }));
    }
  };

  const removeTask = async (id: string) => {
    const oldTask = tasks.find((t) => t.id === id);

    if (!oldTask) return;

    setOperationLoading((prev) => ({
      ...prev,
      deleting: new Set([...prev.deleting, id]),
    }));

    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTask(id);
    } catch (error) {
      setError((error as Error).message);
      setTasks((prev) => [...prev, oldTask]);
    } finally {
      setOperationLoading((prev) => {
        const newDeleting = prev.deleting;
        newDeleting.delete(id);
        return {
          ...prev,
          deleting: newDeleting,
        };
      });
    }
  };

  const updateTask = async (id: string) => {
    const taskToUpdate = tasks.find((t) => t.id === id);

    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }

    setOperationLoading((prev) => ({
      ...prev,
      updating: new Set([...prev.updating, id]),
    }));

    const previousCompleted = taskToUpdate.completed;
    const newCompleted = !previousCompleted;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: newCompleted,
            }
          : t
      )
    );

    try {
      await updateTaskDB(id, newCompleted);
    } catch (error) {
      console.error(error, "updateTask");
      setError((error as Error).message);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: previousCompleted,
              }
            : t
        )
      );
    } finally {
      setOperationLoading((prev) => {
        const newUpdating = prev.updating;
        newUpdating.delete(id);

        return {
          ...prev,
          updating: newUpdating,
        };
      });
    }
  };

  return {
    tasks,
    error,
    addTask,
    removeTask,
    updateTask,
    // Expose loading states
    isFetching: operationLoading.fetching,
    isCreating: operationLoading.creating,
    isUpdating: (id: string) => operationLoading.updating.has(id),
    isDeleting: (id: string) => operationLoading.deleting.has(id),
  };
}
