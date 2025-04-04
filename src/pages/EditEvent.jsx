import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import service from "../services/config.services";
import ClipLoader from "react-spinners/ClipLoader";

function EditEvent() {
    const parametrosDinamicos = useParams();
    const navigate = useNavigate();
  
    const [eventEdited, setEventEdited] = useState(null);

    const getData = async () => {
      try {
        const response = await service.get(
          `/events/${parametrosDinamicos.eventId}`
        );
        setEventEdited(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect( () => {
      getData();
    }, [parametrosDinamicos.eventId]);
    
    const handleAll = (event) => {
        let name = event.target.name;
        let clone = { ...eventEdited };
        clone[name] = event.target.value;
        setEventEdited(clone);
      };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await service.put(`/events/${parametrosDinamicos.eventId}`, eventEdited);
        getData();
        navigate(`/events/${parametrosDinamicos.eventId}`)
      } catch (error) {
        console.log(error);
      }
  };

  if (eventEdited === null) {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "200px",
          alignItems: "center",
        }}
      >
        <h3>Buscando data del evento...</h3>
        <ClipLoader color="green"/>
      </div>
    );
  }
  let date = new Date(eventEdited.date);
  
  return (
    <div className="pageDiv">
      <form onSubmit={handleSubmit}>
        <div className="formCSS">
          <span className="tituloForm">Edit Event</span>
          <label>
            Name:&nbsp;
            <input
              value={eventEdited.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleAll}
            />
          </label>
          <label>
            Date:&nbsp;
            <input
              value={date.toISOString().split('T')[0]}
              name="date"
              type="date"
              onChange={handleAll}
            />
          </label>
          <label>
            Time:&nbsp;
            <input
              value={eventEdited.time}
              name="time"
              type="string"
              placeholder="Time"
              onChange={handleAll}
            />
          </label>
          <div className="formElementTA">
          <label>
            Description:&nbsp;</label>
            <textarea
              className="textArea"
              value={eventEdited.description}
              name="description"
              type="textarea"
              placeholder="Description"
              rows="10" cols="20"
              onChange={handleAll}
            />
          </div>
          <div className="formButtons">
            <button className="btnForm" type="submit">Edit Event</button>
            <Link to="/events">
              <button className="btnBack">Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;