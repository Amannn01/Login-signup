import { Navigate, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";


function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
