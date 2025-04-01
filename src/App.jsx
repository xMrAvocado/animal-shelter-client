import "./App.css";
import { Routes, Route } from "react-router";
import { useEffect,useState } from "react";

// pages
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import AddAnimal from "./pages/AddAnimal";
import AnimalDetails from "./pages/AnimalDetails";
// components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import OnlyPrivate from "./components/OnlyPrivate";
import OnlyAdmin from "./components/OnlyAdmin";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import EditAnimal from "./pages/EditAnimal";



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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-animal" element={<AddAnimal/>} />
        <Route path="/add-event" element={<AddEvent/>} />
        <Route path="/animals/edit/:animalId" element={<EditAnimal/>} />
        <Route path="/animals/:animalId" element={<AnimalDetails/>} />
        <Route path="/events/:eventId" element={<EventDetails/>} />
        <Route path="/events" element={<EventList/>} />
        <Route path="/" element={<OnlyPrivate> <HomePage /> </OnlyPrivate>} />
        <Route path="/admin" element={<OnlyAdmin> <AdminPage /> </OnlyAdmin>} />
        {/* error FE routes here... */}

      </Routes>

      <Footer />
    </div>
  )
}

export default App
