import { TiDeleteOutline } from "react-icons/ti";
import type { Task } from "../schemas/taskSchema";
import classNames from "classnames";

export default function TaskList({
  tasks,
  removeTask,
  updateTask,
}: {
  tasks: Task[];
  removeTask: (id: string) => Promise<void>;
  updateTask: (id: string) => Promise<void>;
}) {
  if (!tasks) return;

  return (
    <div className="flex flex-col gap-y-2">
      {tasks.length > 0 ? (
        tasks.map((t) => (
          <TaskItem
            task={t}
            key={t.id}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>No task available</p>
        </div>
      )}
    </div>
  );
}

function TaskItem({
  task,
  removeTask,
  updateTask,
}: {
  task: Task;
  removeTask: (id: string) => Promise<void>;
  updateTask: (id: string) => Promise<void>;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        updateTask(task.id);
      }}
      className="flex w-full justify-between space-x-2"
    >
      <div className="flex flex-1 justify-between cursor-pointer relative bg-gray-200/50 hover:bg-gray-400/50 px-2 rounded-sm">
        <p
          className={classNames(
            task.completed ? "text-black/40" : "text-black"
          )}
        >
          {task.title}
        </p>

        {task.completed && (
          <div className="w-[90%] h-0.5 bg-black/20  absolute top-1/2 transform -translate-y-1/2"></div>
        )}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          removeTask(task.id);
        }}
        className="bg-red-300 hover:bg-red-500 rounded-md text-white w-6 h-6 flex justify-center items-center"
      >
        <TiDeleteOutline className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
