import React from 'react'
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div style={{ textAlign: "center", paddingTop: "200px", alignItems:"center"}}>
      <h1 >PROFILE</h1>
      <Link to="/"><button className="btnBack">Back</button></Link>
    </div>
  )
}

export default Profile