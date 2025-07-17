import { Router, Request, Response } from "express";
import { Task } from "../types/task";
import { TaskSchema, TaskUpdateSchema } from "../schemas/taskSchema";

const taskRouter = Router();

let tasks: Task[] = [{ id: "siemano", title: "FirstTask", completed: false }];

taskRouter.get("/", (req, res) => {
  res.json(tasks);
});

taskRouter.post("/", (req: Request, res: Response) => {
  const result = TaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    title: result.data.title,
    completed: result.data.completed,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

taskRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.slice(index, 1);
  return res.json(deleted);
});

taskRouter.put("/:id", (req, res) => {
  const { id } = req.params;

  const result = TaskUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  Object.assign(task, result.data);

  return res.json(task);
});

export default taskRouter;
