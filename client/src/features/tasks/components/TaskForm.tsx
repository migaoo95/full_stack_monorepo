import { FaPlus } from "react-icons/fa";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import Spinner from "@/components/common/Spinner";

export default function TaskForm({
  addTask,
}: {
  addTask: (title: string) => Promise<void>;
}) {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTask = async () => {
    setLoading(true);
    await addTask(title);
    setTitle("");
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Input
        type="text"
        placeholder="Task.."
        value={title}
        onChange={handleTitleChange}
      />
      <div
        onClick={handleAddTask}
        className="w-9 h-9 cursor-pointer bg-blue-300 text-white rounded-md flex items-center justify-center"
      >
        {loading ? <Spinner /> : <FaPlus />}
      </div>
    </div>
  );
}
