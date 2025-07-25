import z from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  completed: z.boolean(),
});

export const TaskArraySchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
