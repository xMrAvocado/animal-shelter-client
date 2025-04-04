import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div style={{ textAlign: "center", paddingTop: "200px", alignItems:"center"}}>
      <h1 >ERROR: NOT FOUND</h1>
      <Link to="/"><button className="btnBack">Back</button></Link>
    </div>
  );
}

export default NotFound;