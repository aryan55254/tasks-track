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
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/*  public routes */}
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
              <ActiveTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alltasks"
          element={
            <ProtectedRoute>
              <AllTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completedtasks"
          element={
            <ProtectedRoute>
              <CompletedTasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
