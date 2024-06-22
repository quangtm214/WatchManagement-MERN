import Home from "./pages/home";
import Routing from "./routes/router";
import { AuthProvider } from "./service/authAPI/authProvideAPI";

function App() {
  return (
    <AuthProvider>
      <Routing>
        <Home />
      </Routing>
    </AuthProvider>
  );
}

export default App;
