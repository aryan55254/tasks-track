import { useState } from "react";

function InputArea({ onTaskAdded }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const CHARACTER_LIMIT = 50;

  const handleTaskChange = (e) => {
    const value = e.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setTask(value);
      if (error) setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      const addTaskEndpoint = `${apiUrl}/api/task/add`;
      const response = await fetch(addTaskEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Task: task,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }
      setTask("");
      if (onTaskAdded) {
        onTaskAdded(data);
      }
    } catch (err) {
      console.error("Submission error : ", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto my-8 px-4 flex flex-col gap-2"
    >
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <input
          type="text"
          className="flex-grow bg-slate-800 text-slate-200 border border-slate-700 rounded-md px-4 py-3 text-base placeholder:text-slate-500 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-gray-500/50 transition-all duration-200"
          placeholder="Add New Task ...... "
          value={task}
          onChange={handleTaskChange}
          disabled={isLoading}
          maxLength={CHARACTER_LIMIT}
        />
        <button
          type="submit"
          className="bg-gray-700 text-gray-200 font-semibold rounded-md px-6 py-3 text-base cursor-pointer hover:bg-gray-400 hover:text-gray-900 transition-colors duration-200 disabled:bg-slate-700 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="flex justify-between items-center px-1 min-h-[1.25rem] text-sm">
        {error ? <p className="text-red-500 m-0">{error}</p> : <span></span>}
        <p className="text-slate-400 m-0">
          {task.length}/{CHARACTER_LIMIT}
        </p>
      </div>
    </form>
  );
}

export default InputArea;
