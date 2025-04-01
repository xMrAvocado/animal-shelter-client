import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditAnimal() {
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

  const handleAll = (event) => {
    let name = event.target.name;
    let clone = { ...animal };
    clone[name] = event.target.value;
    setAnimal(clone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await service.put(`/animals/${parametrosDinamicos.animalId}`, animal);
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit}>
        <div className="formCSS">
          <span className="tituloForm">Edit Animal</span>
          <label>
            Name:&nbsp;
            <input
              value={animal.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleAll}
            />
          </label>
          <label>
            Type:&nbsp;
            <select
              onChange={handleAll}
              value={animal.type}
              id="addTypeSelector"
            >
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
              value={animal.description}
              name="description"
              type="textarea"
              placeholder="Description"
              onChange={handleAll}
            />
          </label>
          <label>
            Age:&nbsp;
            <input
              value={animal.age}
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
              onChange={handleAll}
              value={animal.gender}
              id="addGenderSelector"
            >
              <option className="optionType" value="Male">
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
              value={animal.race}
              name="race"
              type="text"
              placeholder="Race"
              onChange={handleAll}
            />
          </label>
          <label>
            Image:&nbsp;
            <input
              value={animal.img}
              name="image"
              type="url"
              placeholder="Image"
              onChange={handleAll}
            />
          </label>
          <div className="btnsForms">
            <button type="submit">Edit Animal</button>
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditAnimal;
