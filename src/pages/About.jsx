import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div id="aboutDivCSS">
      <p className="descripcionProyecto">
        Website created with React, which provides a list of animals available
        for adoption by type and pages with details about each one, as well as a
        list of events in which customers can participate.
        <br /> <br /> In addition to viewing the list, the administrator can
        add, delete, or edit elements.
        <br /> <br />
        <span style={{ textDecoration: "underline" }}>
          Posible functionalities
        </span>
        : Animals pagination for better order and a profile page for the user.
      </p>
      <div className="datosEstudiante">
        <img
          src="https://res.cloudinary.com/dh8naz2ht/image/upload/v1741774814/imagen_samuel_zeoqlg.jpg"
          alt="samuel"
          width="200px"
        />
        <h3>Samuel Pérez Besada</h3>
        <div className="enlacesEstudiante">
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/samuel-p%C3%A9rez-besada-136373231/"
          >
            LinkedIn
          </a>
          <a className="github" href="https://github.com/xMrAvocado">
            GitHub
          </a>
        </div>
        <p className="descripcionEstudiante">
          Proactivo, asertivo, con capacidades sociales y me gusta trabajar en
          equipo. <br />
          Constante y con ganas de aprender.
        </p>
      </div>
      <Link to="/">
        <button className="btnBack">Back</button>
      </Link>
    </div>
  );
}

export default About;
