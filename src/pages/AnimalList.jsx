import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function AnimalList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [listAnimals, setListAnimals] = useState([]);

  const handleSelectType = (event) => {
    //navigate(`/animals/${event.target.value}`);
    setSearchParams({type: event.target.value})
  };

  const animalType = searchParams.get("type") || "Dog"

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await service.get(
          `/animals/type/${animalType}`
        );
        setListAnimals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [animalType]);

  /*if (listAnimals === null) {
    return (
      <div>
        <h3>No data avaliable...</h3>
      </div>
    );
  }*/

  return (
    <div className="pageDiv" id="animalsByTypeContainer">
      <select onChange={handleSelectType} value={animalType} className="typeSelector">
        <option className="optionType" value="Dog">
          Dog
        </option>
        <option className="optionType" value="Cat">
          Cat
        </option>
        <option className="optionType" value="Fish">
          Fish
        </option>
        <option className="optionType" value="Bird">
          Bird
        </option>
        <option className="optionType" value="Other">
          Other
        </option>
      </select>
      <div id="animalListCSS">
        {listAnimals
          .map((eachAnimal) => {
            return (
              
                <div id="eachAnimalList">
                    <img src={eachAnimal.img} width="200px" height="200px"></img>
                  <h2 className="animalName">{eachAnimal.name}</h2>
                  <Link key={eachAnimal._id} to={`/animals/${eachAnimal._id}`}><button className="detailsButton">Details</button></Link>
                </div>
            );
          })}
      </div>
    </div>
  );
}

export default AnimalList;
