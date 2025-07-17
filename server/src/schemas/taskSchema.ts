import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(2),
  completed: z.boolean(),
});

export const TaskUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  completed: z.boolean().optional(),
});
