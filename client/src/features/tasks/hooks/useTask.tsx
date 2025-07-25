import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTaskDB } from "../api";
import type { Task } from "../schemas/taskSchema";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTask = async (title: string) => {
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
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    console.log("Deleting");
    const oldTask = tasks.find((t) => t.id === id);

    if (!oldTask) return;

    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTask(id);
    } catch (error) {
      setTasks((prev) => [...prev, oldTask]);
    }
  };

  const updateTask = async (id: string) => {
    // Find current completion status *before* setting state
    const taskToUpdate = tasks.find((t) => t.id === id);

    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }

    const previousCompleted = taskToUpdate.completed;
    const newCompleted = !previousCompleted;

    // Optimistically update
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
      console.error("Update failed, reverting");
      // Revert back if API call failed
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
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    updateTask,
  };
}
