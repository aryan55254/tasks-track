import { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  useEffect(() => {
    const fetchAllTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/api/task`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data.tasks || []); // Handle case where no tasks are found
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTasks();
  }, [apiUrl]);
  const handleTaskAdded = async (taskText) => {
    try {
      const response = await fetch(`${apiUrl}/api/task/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Task: taskText }),
        credentials: "include",
      });
      const newTask = await response.json();
      if (!response.ok)
        throw new Error(newTask.message || "Failed to add task");

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleDeleteTask = async (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    try {
      await fetch(`${apiUrl}/api/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleEditTask = async (taskId, newTaskText) => {
    try {
      const response = await fetch(`${apiUrl}/api/task/edit/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Task: newTaskText }),
        credentials: "include",
      });
      const updatedTask = await response.json();
      if (!response.ok)
        throw new Error(updatedTask.message || "Failed to edit task.");

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };
  const handleStatusChange = async (taskId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/task/changestatus/${taskId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const updatedTask = await response.json();
      if (!response.ok)
        throw new Error(updatedTask.message || "Failed to change status.");

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    handleTaskAdded,
    handleDeleteTask,
    handleEditTask,
    handleStatusChange,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
