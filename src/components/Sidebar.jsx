import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Sidebar(props) {
    const {authenticateUser, isLoggedIn, userRole} = useContext(AuthContext)

    const navigate = useNavigate()
  
    const handleLogout = async () =>{
      try {
        localStorage.removeItem("authToken")

        await authenticateUser()
  
        navigate("/signup")
      } catch (error) {
        console.log(error)
      }
    }
    // CSS

    const sideBarCSS = {
        alignItems: "center",
        border: "solid",
        paddingRight: "15px",
        opacity:"0.90",
        minHeight: "20vh",
        minWidth: "7vw", 
        backgroundColor: "#A2DFF7",
        position:"fixed", 
        top:"87px",
        right: "0",
        transform: props.cambioScaleY,
        transition: "all 0.4s",
    }


    return (
        <div style={sideBarCSS}>
            <Link to="/"><h2 style={{textAlign: "right"}} className="menuOption">Animal List</h2></Link>

            <Link to="/events"><h2 style={{textAlign: "right"}} className="menuOption">Event List</h2></Link>
            <Link to="/about"><h2 style={{textAlign: "right"}}className="menuOption">About Dev</h2></Link>
            
            {
            userRole === "admin"
            ?
            <>
            {/*<Link to="/admin"><h2 style={{textAlign: "right"}} className="menuOption">Admin Page</h2></Link>*/}
            <Link to="/add-animal"><h2 style={{textAlign: "right"}} className="menuOption">Add Animal</h2></Link>
            <Link to="/add-event"><h2 style={{textAlign: "right"}} className="menuOption">Add Event</h2></Link>
            <br/>
            </>
            :
            null
          }

          {
            isLoggedIn === false
            ?
            <>
            <Link to="/signup"><h2 style={{textAlign: "right"}} className="menuOption">Sign Up</h2></Link>
            <Link to="/login"><h2 style={{textAlign: "right"}} className="menuOption">Log In</h2></Link>
            </>
            :
            <>
            <Link onClick={handleLogout}><h2 style={{textAlign: "right"}} className="menuOption">Log Out</h2></Link>
            <Link to="/profile"><h2 style={{textAlign: "right"}} className="menuOption">Profile</h2></Link>
            </>
            
          }
          
            
            
            
        </div>
    )
}

export default Sidebar