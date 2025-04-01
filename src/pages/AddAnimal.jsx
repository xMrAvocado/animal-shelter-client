import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import service from "../services/config.services";

function AddAnimal() {
  const [nuevoAnimal, setNuevoAnimal] = useState({
    name: "",
    type: "",
    description: "",
    age: 0,
    gender: "",
    race: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleAll = (event) => {
    let name = event.target.name;
    let clone = { ...nuevoAnimal };
    clone[name] = event.target.value;
    setNuevoAnimal(clone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await service.post(`/animals`, nuevoAnimal);
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit}>
        <div className="formCSS">
          <span className="tituloForm">Add Animal</span>
          <label>
            Name:&nbsp;
            <input
              value={nuevoAnimal.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleAll}
            />
          </label>
          <label>
            Type:&nbsp;
            <select
              name="type"
              onChange={handleAll}
              value={nuevoAnimal.type}
              id="addTypeSelector"
            >
              <option className="optionType" value="">
                Option
              </option>
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
          </label>

          <label>
            Description:&nbsp;
            <input
              className="textArea"
              value={nuevoAnimal.description}
              name="description"
              type="textarea"
              placeholder="Description"
              onChange={handleAll}
            />
          </label>
          <label>
            Age:&nbsp;
            <input
              value={nuevoAnimal.age}
              name="age"
              type="number"
              min={0}
              placeholder="Age"
              onChange={handleAll}
            />
          </label>
          <label>
            Gender:&nbsp;
            <select
              name="gender"
              onChange={handleAll}
              value={nuevoAnimal.gender}
              id="addGenderSelector"
            >
              <option className="optionType" value="">
                Option
              </option>
              <option className="optionType" value="Male" selected>
                Male
              </option>
              <option className="optionType" value="Female">
                Female
              </option>
            </select>
          </label>
          <label>
            Race:&nbsp;
            <input
              value={nuevoAnimal.race}
              name="race"
              type="text"
              placeholder="Race"
              onChange={handleAll}
            />
          </label>
          <label>
            Image:&nbsp;
            <input
              value={nuevoAnimal.img}
              name="img"
              type="url"
              placeholder="Image"
              onChange={handleAll}
            />
          </label>
          <div className="btnsForms">
            <button type="submit">Add Animal</button>
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAnimal;
