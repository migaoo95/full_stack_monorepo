import { useTasks } from "@/hooks/useTasks";
import { Card } from "../ui/card";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";

export default function TaskContainer() {
  const { tasks, loading, error } = useTasks();
  return (
    <div className="flex justify-center items-center  w-full h-full ">
      <Card className="w-full max-w-lg p-4">
        <TaskForm />
        {loading ? <Spinner /> : <TaskList />}
        <TaskItem />
      </Card>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center">
      <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
