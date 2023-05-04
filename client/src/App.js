import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Register from "./pages/register/Register";
import { socket } from "./socket/socket";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
