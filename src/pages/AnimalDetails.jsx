import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function AnimalDetails() {
  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await service.get(
          `/animals/${parametrosDinamicos.animalId}`
        );
        console.log(response.data)
        setAnimal(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [parametrosDinamicos.animalId]);

  const handleDelete = async () => {
    try {
      await service.delete(`/animals/${parametrosDinamicos.animalId}`);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInterested = async () => {
    try {
      await service.patch(`/animals/${parametrosDinamicos.animalId}/interested`);
      navigate(`/`);
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
      {animal.interested.map((eachInterested)=>{
        return(
        <p>{eachInterested.name}</p>
        )
      })}

      <button id="btnParticipate" onClick={handleInterested}>
        Apply for adoption
      </button>

      <button className="btnDelete" onClick={handleDelete}>
        Delete
      </button>
      <Link to={`/animals/edit/${parametrosDinamicos.animalId}`}>
        <button className="btnEdit">Edit</button>
      </Link>
    </div>
  );
}

export default AnimalDetails;
