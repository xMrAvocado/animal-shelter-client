import { Link } from "react-router-dom"

function Error() {
    return (
      <div style={{ textAlign: "center", paddingTop: "200px", alignItems:"center" }}>
        <h1 >It appears that our developers made a mistake, they are working hard to ammend it.</h1>
        <Link to="/"><button className="btnBack">Back</button></Link>
      </div>
    );
  }
  
  export default Error;