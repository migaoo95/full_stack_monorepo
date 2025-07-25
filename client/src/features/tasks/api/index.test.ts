import { describe, it, expect } from "vitest";
import type { Task } from "../schemas/taskSchema";

const globalTasks = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Walk dog", completed: true },
];

function filterCompletedTasks(tasks: Task[]) {
  return tasks.filter((task) => task.completed === true);
}

describe("filterCompletedTasks", () => {
  it("Should return all tasks with completed status", () => {
    const result = filterCompletedTasks(globalTasks);
    expect(result).toEqual([{ id: "2", title: "Walk dog", completed: true }]);
  });
});
