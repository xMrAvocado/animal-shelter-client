import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import AddAnimal from "./pages/AddAnimal";
import AnimalDetails from "./pages/AnimalDetails";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import About from "./pages/About";
// components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import OnlyPrivate from "./components/OnlyPrivate";
import OnlyAdmin from "./components/OnlyAdmin";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import EditAnimal from "./pages/EditAnimal";
import EditEvent from "./pages/EditEvent";



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
        <Route path="/about" element={<About />}></Route>
        <Route path="/add-animal" element={<OnlyAdmin><AddAnimal/></OnlyAdmin>} />
        <Route path="/add-event" element={<OnlyAdmin><AddEvent/></OnlyAdmin>} />
        <Route path="/animals/edit/:animalId" element={<OnlyAdmin><EditAnimal/></OnlyAdmin>} />
        <Route path="/events/edit/:eventId" element={<OnlyAdmin><EditEvent/></OnlyAdmin>} />
        <Route path="/animals/:animalId" element={<OnlyPrivate><AnimalDetails/></OnlyPrivate>} />
        <Route path="/events/:eventId" element={<OnlyPrivate><EventDetails/></OnlyPrivate>} />
        <Route path="/events" element={<EventList/>} />
        <Route path="/" element={ <HomePage /> } />
        <Route path="/admin" element={<OnlyAdmin> <AdminPage /> </OnlyAdmin>} />
        {/* error FE routes here... */}

        <Route path="/error" element={<Error />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
