import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import service from "../services/config.services";

function AddAnimal() {
  // below state will hold the image URL from cloudinary. This will come from the backend.
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const [nuevoAnimal, setNuevoAnimal] = useState({
    name: "",
    type: "",
    description: "",
    age: 0,
    gender: "",
    race: "",
  });

  const navigate = useNavigate();

  const handleAll = (event) => {
    let name = event.target.name;
    let clone = { ...nuevoAnimal };
    clone[name] = event.target.value;
    setNuevoAnimal(clone);
  };

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("img", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post("/upload",
        uploadData
      );
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      console.log(error)
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //agragar al objeto la propiedad img con su correspondiente valor
      let clone = {...nuevoAnimal}
      clone.img = imageUrl
      await service.post(`/animals`, clone);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit}>
        <div className="formCSS">
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
              className="typeSelector"
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
          <div className="formElementTA">
          <label>
            Description:&nbsp;</label>
            <textarea
              className="textArea"
              value={nuevoAnimal.description}
              name="description"
              type="textarea"
              placeholder="Description"
              rows="10" cols="20"
              onChange={handleAll}
            />
          </div>
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
              className="typeSelector"
            >
              <option className="optionType" value="">
                Option
              </option>
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
              value={nuevoAnimal.race}
              name="race"
              type="text"
              placeholder="Race"
              onChange={handleAll}
            />
          </label>
          <div>
            <label>Image: </label>
            <input
              type="file"
              name="img"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {/* below disabled prevents the user from attempting another upload while one is already happening */}
          </div>
          ;
          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h3>... uploading image</h3> : null}
          {/* below line will render a preview of the image from cloudinary */}
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt="img" width={200} />
            </div>
          ) : null}
          <div className="formButtons">
            <button className="btnForm" type="submit">Add Animal</button>
            <Link to="/">
              <button className="btnBack">Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAnimal;
