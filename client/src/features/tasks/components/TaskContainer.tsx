import { Card } from "../../../components/ui/card";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Spinner from "../../../components/common/Spinner";
import useTasks from "../hooks/useTask";

export default function TaskContainer() {
  const { tasks, loading, addTask, removeTask, updateTask } = useTasks();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-full max-w-lg p-4">
        <div className="">
          <p className="text-center text-xl">Task list</p>
          <p className="text-center text-muted-foreground">
            Create, Update and Delete tasks
          </p>
        </div>
        <TaskForm addTask={addTask} />
        {loading ? (
          <Spinner />
        ) : (
          <TaskList
            tasks={tasks}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        )}
      </Card>
    </div>
  );
}
