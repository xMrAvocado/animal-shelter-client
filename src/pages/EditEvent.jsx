import { useState, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditEvent() {
    const parametrosDinamicos = useParams();
    const navigate = useNavigate();
  
    const [eventEdited, setEventEdited] = useState(null);
  
    useEffect(async () => {
      try {
        const response = await service.get(
          `/events/${parametrosDinamicos.eventId}`
        );
        setEventEdited(response.data);
      } catch (error) {
        console.log(error);
      }
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
        navigate(`/events`);
      } catch (error) {
        console.log(error);
      }
  };
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
              value={eventEdited.date}
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
          <label>
            Description:&nbsp;
            <input
              className="textArea"
              value={eventEdited.description}
              name="description"
              type="textarea"
              placeholder="Description"
              onChange={handleAll}
            />
          </label>
          <div className="btnsForms">
            <button type="submit">Edit Event</button>
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;