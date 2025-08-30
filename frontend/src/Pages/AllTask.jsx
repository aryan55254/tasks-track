import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NavComp from "../Components/NavComp";
import InputText from "../Components/InputArea";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";
function AllTask() {
  const [tasks, settasks] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const handleTaskAdded = (newTask) => {
    if (!newTask || !newTask._id) {
      console.error(
        "handleTaskAdded was called with an invalid object:",
        newTask
      );
      return;
    }
    settasks((prevTasks) => {
      const taskExists = prevTasks.some((task) => task._id === newTask._id);

      if (taskExists) {
        console.warn("Attempted to add a duplicate task. Ignoring.", newTask);
        return prevTasks;
      }
      return [newTask, ...prevTasks];
    });
  };
  useEffect(() => {
    const fetchalltasks = async () => {
      try {
        setloading(true);
        seterror(null);
        const apiurl = import.meta.env.VITE_BACKEND_API;
        const alltasksendpoint = `${apiurl}/api/task`;
        const response = await fetch(alltasksendpoint, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
        const data = await response.json();
        settasks(data.tasks);
      } catch (err) {
        console.log("error : ", err);
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };
    fetchalltasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const apiurl = import.meta.env.VITE_BACKEND_API;
      const response = await fetch(`${apiurl}/api/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log("Delete API Response Status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }
      settasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      seterror(err.message);
    }
  };
  const handleEditTask = async (taskId, currentTaskText) => {
    const newTaskText = prompt("Enter new task text:", currentTaskText);
    if (newTaskText === null || newTaskText.trim() === "") return;

    try {
      const apiurl = import.meta.env.VITE_BACKEND_API;
      const response = await fetch(`${apiurl}/api/task/edit/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Task: newTaskText }),
        credentials: "include",
      });
      const updatedTask = await response.json();
      console.log(" handleEditTask received:", updatedTask);
      if (!response.ok) {
        throw new Error(updatedTask.message || "Failed to edit task.");
      }
      settasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      seterror(err.message);
    }
  };
  const handleStatusChange = async (taskId) => {
    try {
      const apiurl = import.meta.env.VITE_BACKEND_API;
      const response = await fetch(
        `${apiurl}/api/task/changestatus/${taskId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const updatedTask = await response.json();
      console.log(" handleStatusChange received:", updatedTask);
      if (!response.ok) {
        throw new Error(updatedTask.message || "Failed to change status.");
      }
      settasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      seterror(err.message);
    }
  };
  console.log("Component is rendering with this tasks array:", tasks);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <NavComp />
      <main className="flex-grow container mx-auto p-4 sm:p-6">
        <InputText onTaskAdded={handleTaskAdded} />
        <div className="w-full max-w-2xl mx-auto my-8 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            All Tasks
          </h2>
          {loading && (
            <p className="text-gray-400 text-center py-8">Loading tasks...</p>
          )}
          {error && (
            <p className="text-red-500 text-center py-8">Error: {error}</p>
          )}
          {!loading && !error && (
            <ul className="space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li
                    key={task._id}
                    className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow text-gray-900 dark:text-gray-100 flex items-center justify-between"
                  >
                    {" "}
                    <span>{task.Task}</span>
                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => handleStatusChange(task._id)}
                        className="text-green-500 hover:text-green-400"
                      >
                        {task.Completed ? (
                          <FaCheckCircle size={20} />
                        ) : (
                          <FaRegCircle size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditTask(task._id, task.Task)}
                        className="text-blue-500 hover:text-blue-400"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  You have no tasks. Add one above!
                </p>
              )}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AllTask;
