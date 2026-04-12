import "./App.css";
import AdminDashboard from "./Components/AdminDashboard";
import Feedback from "./Components/Feedback";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <>
      <Login />
      <Register />
      <Feedback />
      <AdminDashboard />
    </>
  );
}

export default App;
