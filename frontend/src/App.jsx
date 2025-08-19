import Landing from "./Pages/Landing";
import GearBackgroundLayout from "./Components/GearBackground/GearBackgroundLayout";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <GearBackgroundLayout>
        <Landing />
      </GearBackgroundLayout>
    </AuthProvider>
  );
}

export default App;
