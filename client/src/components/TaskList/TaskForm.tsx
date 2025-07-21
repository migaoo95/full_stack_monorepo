import { FaPlus } from "react-icons/fa";
import { Input } from "../ui/input";

export default function TaskForm() {
  return (
    <div className="flex items-center gap-x-2">
      <Input type="text" placeholder="Task.." />
      <div className="w-9 h-9 bg-blue-300 text-white rounded-md flex items-center justify-center">
        <FaPlus />
      </div>
    </div>
  );
}
