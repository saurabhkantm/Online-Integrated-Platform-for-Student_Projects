import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes";
import ChatWidget from "./components/common/chat.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ChatWidget />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;