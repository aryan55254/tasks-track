import { useTasks } from "../Context/TaskContext";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";

function TaskListItem({ task }) {
  const { handleDeleteTask, handleEditTask, handleStatusChange } = useTasks();

  const onEdit = () => {
    const newTaskText = prompt("Enter new task text:", task.Task);
    if (newTaskText && newTaskText.trim() !== "") {
      handleEditTask(task._id, newTaskText.trim());
    }
  };

  const onStatusChange = () => {
    handleStatusChange(task._id);
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleDeleteTask(task._id);
    }
  };

  return (
    <li className="bg-slate-800 p-4 rounded-lg shadow-sm flex items-center justify-between transition-colors duration-200">
      <span
        className={`flex-grow mr-4 ${
          task.Completed ? "line-through text-slate-500" : "text-slate-200"
        }`}
      >
        {task.Task}
      </span>

      <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
        <button
          onClick={onStatusChange}
          className={`p-2 rounded-full cursor-pointer  transition-colors ${
            task.Completed
              ? "text-green-400 hover:bg-slate-700 focus:ring-green-500"
              : "text-slate-400 hover:bg-slate-700 focus:ring-slate-500"
          }`}
          aria-label="Toggle task status"
        >
          {task.Completed ? (
            <FaCheckCircle size={20} />
          ) : (
            <FaRegCircle size={20} />
          )}
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-full cursor-pointer  text-sky-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
          aria-label="Edit task"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full cursor-pointer text-rose-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
          aria-label="Delete task"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </li>
  );
}

export default TaskListItem;
