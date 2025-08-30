import { useMemo } from "react";
import { useTasks } from "../Context/TaskContext";
import Header from "../Components/Header";
import NavComp from "../Components/NavComp";
import Footer from "../Components/Footer";
import TaskListItem from "../Components/TaskListItem";

function CompletedTask() {
  const { tasks, loading, error } = useTasks();

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.Completed);
  }, [tasks]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900">
      <Header />
      <NavComp />
      <main className="flex-grow container mx-auto p-4 sm:p-6 pb-16">
        <div className="w-full max-w-2xl mx-auto my-8 px-4">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-gray-200 mb-6 text-center">
            Completed Tasks
          </h2>
          {loading && (
            <p className="text-center py-8 text-slate-400">Loading tasks...</p>
          )}
          {error && (
            <p className="text-center py-8 text-rose-500">Error: {error}</p>
          )}
          {!loading && !error && (
            <ul className="space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <TaskListItem key={task._id} task={task} />
                ))
              ) : (
                <p className="text-center py-8 text-slate-500">
                  You have not completed any tasks yet.
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
export default CompletedTask;
