import { TaskArraySchema, type Task } from "../schemas/taskSchema";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks`);

  if (!response.ok) throw new Error("Failed to fetch tasks");

  const rawData = await response.json();
  const result = TaskArraySchema.safeParse(rawData);

  if (!result.success) {
    console.error("Invalid data format:", result.error);
    throw new Error("Invalid data from the server.");
  }

  return result.data;
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
    }),
  });

  if (!response.ok) throw new Error("Failed to create");

  const task = await response.json();

  return task;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) throw new Error("Failed to delete item.");
};

export const updateTaskDB = async (
  id: string,
  completed: boolean
): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed,
      }),
    }
  );

  if (!response.ok) throw new Error("Failed to update item.");
};
