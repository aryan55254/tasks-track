import Landing from "./Pages/Landing";
import GearBackgroundLayout from "./Components/GearBackground/GearBackgroundLayout";
import { AuthProvider } from "./Context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Routing/ProtectedRoute";
import ActiveTasks from "./Pages/ActiveTask";
import AllTasks from "./Pages/AllTask";
import CompletedTasks from "./Pages/CompletedTask";
import { TaskProvider } from "./Context/TaskContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={
            <GearBackgroundLayout>
              <Landing />
            </GearBackgroundLayout>
          }
        />
        <Route
          path="/login"
          element={
            <GearBackgroundLayout>
              <Login />
            </GearBackgroundLayout>
          }
        />
        <Route
          path="/register"
          element={
            <GearBackgroundLayout>
              <Register />
            </GearBackgroundLayout>
          }
        />

        {/* protected routes */}
        <Route
          path="/activetasks"
          element={
            <ProtectedRoute>
              <TaskProvider>
                <ActiveTasks />
              </TaskProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alltasks"
          element={
            <ProtectedRoute>
              <TaskProvider>
                <AllTasks />
              </TaskProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/completedtasks"
          element={
            <ProtectedRoute>
              <TaskProvider>
                <CompletedTasks />
              </TaskProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
