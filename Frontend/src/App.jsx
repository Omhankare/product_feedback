import "./App.css";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./Components/AdminDashboard";
import Feedback from "./Components/Feedback";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
