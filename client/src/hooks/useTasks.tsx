import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks.");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
  };
}
