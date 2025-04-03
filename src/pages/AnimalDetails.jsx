import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import service from "../services/config.services";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/auth.context";

function AnimalDetails() {
  const { userRole } = useContext(AuthContext);

  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const getData = async () => {
    try {
      const response = await service.get(
        `/animals/${parametrosDinamicos.animalId}`
      );
      console.log(response.data);
      setAnimal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [parametrosDinamicos.animalId]);

  const handleDelete = async () => {
    let text = "Are you sure you want to delete it?";
    if (confirm(text) == true) {
      try {
        await service.delete(`/animals/${parametrosDinamicos.animalId}`);
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInterested = async () => {
    try {
      await service.patch(
        `/animals/${parametrosDinamicos.animalId}/interested`
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  if (animal === null) {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "200px",
          alignItems: "center",
        }}
      >
        <h3>Buscando data del animal...</h3>
        <ClipLoader color="green" />
      </div>
    );
  }

  return (
    <div id="animalDetails">
      <img src={animal.img} width="250px" />
      <h2 className="animalName">{animal.name}</h2>
      <h3>from</h3>
      <h2 className="shelterName">{animal.creator.name}</h2>
      <div className="infoAnimal">
        <div id="typeGenderAnimal">
          <h2>{animal.type}</h2>
          <h2>{animal.gender}</h2>
        </div>
        <h2>Age: {animal.age} y/o</h2>
        <h2>Race: {animal.race}</h2>
        <p className="description">{animal.description}</p>
      </div>
      <h2>People interested:</h2>
      {animal.interested.map((eachInterested) => {
        return <p className="nameUserList">{eachInterested.name}</p>;
      })}

      {userRole === "admin" ? (
        <div className="rowButtons">
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/animals/edit/${parametrosDinamicos.animalId}`}>
            <button className="btnEdit">Edit</button>
          </Link>
        </div>
      ) : (
        <button className="btnUser" onClick={handleInterested}>
          Apply for adoption
        </button>
      )}
      <Link to="/">
        <button className="btnBack">Back</button>
      </Link>
    </div>
  );
}

export default AnimalDetails;
