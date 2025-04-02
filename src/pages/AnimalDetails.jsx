import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.services";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/auth.context";

function AnimalDetails() {
  const {userRole} = useContext(AuthContext)

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
    <div className="pageDiv">
      <div>AnimalDetails</div>
      <img src={animal.img} width="250px" />
      <h2>{animal.name}</h2>
      <h2>{animal.creator.name}</h2>
      <h3>{animal.type}</h3>
      <h3>{animal.gender}</h3>
      <h3>{animal.age} y/o</h3>
      <h3>{animal.race}</h3>
      <p>{animal.description}</p>
      {animal.interested.map((eachInterested) => {
        return <p>{eachInterested.name}</p>;
      })}

      {userRole === "admin" ? (
        <>
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/animals/edit/${parametrosDinamicos.animalId}`}>
            <button className="btnEdit">Edit</button>
          </Link>
        </>
      ) : (
        <button id="btnParticipate" onClick={handleInterested}>
          Apply for adoption
        </button>
      )}
    </div>
  );
}

export default AnimalDetails;
