import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import service from "../services/config.services";

function AddEvent() {
  const [nuevoEvento, setNuevoEvento] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    organizer: "",
    participants: [],
  });

  const navigate = useNavigate();

  const handleAll = (event) => {
    let name = event.target.name;
    let clone = { ...nuevoEvento };
    clone[name] = event.target.value;
    setNuevoEvento(clone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await service.post(`/events`, nuevoEvento);
        navigate(`/events`);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit}>
        <div className="formCSS">
          <span className="tituloForm">Add Event</span>
          <label>
            Name:&nbsp;
            <input
              value={nuevoEvento.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleAll}
            />
          </label>
          <label>
            Date:&nbsp;
            <input
              value={nuevoEvento.date}
              name="date"
              type="date"
              onChange={handleAll}
            />
          </label>
          <label>
            Time:&nbsp;
            <input
              value={nuevoEvento.time}
              name="time"
              type="string"
              placeholder="Time"
              onChange={handleAll}
            />
          </label>
          <div className="formElementTA">
          <label>
            Description:&nbsp;
            </label>
            <textarea
              className="textArea"
              value={nuevoEvento.description}
              name="description"
              type="textarea"
              placeholder="Description"
              rows="10" cols="20"
              onChange={handleAll}
            />
            </div>
          <div className="formButtons">
            <button className="btnForm" type="submit">Add Event</button>
            <Link to="/events">
              <button className="btnBack">Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
