import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"

// components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

/*Aparte de clase lunes, ver la del martes

VER ROLES

VER SERVICIOS
*/
function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* error FE routes here... */}

      </Routes>

      <Footer />
    </div>
  )
}

export default App
