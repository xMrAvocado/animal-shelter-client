import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AnimalDetails() {
  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);

  useEffect(async () => {
    try {
      const response = await service.get(
        `/animals/${parametrosDinamicos.animalId}`
      );
      setAnimal(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [parametrosDinamicos.animalId]);

  const handleDelete = async () => {
    try {
        await service.delete(
          `/animals/${parametrosDinamicos.animalId}`
        );
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="pageDiv">
      <div>AnimalDetails</div>
      <img src={animal.img} width="250px"/>
      <h2>{animal.name}</h2>
      {/*<h2>{animal.creator}</h2>*/}
      <h3>{animal.type}</h3>
      <h3>{animal.gender}</h3>
      <h3>{animal.age} y/o</h3>
      <h3>{animal.race} y/o</h3>
      <p>{animal.description}</p>
      <p>{animal.interested}</p>


      <button id="btnDelete" onClick={handleDelete}>Delete</button>
      <Link to={`/animals/edit/${parametrosDinamicos.animalId}`}><button>Edit</button></Link>
    </div>
  );
}

export default AnimalDetails;
