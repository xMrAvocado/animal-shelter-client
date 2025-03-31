import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EventDetails() {
  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(async () => {
    try {
      const response = await service.get(
        `/events/${parametrosDinamicos.eventId}`
      );
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [parametrosDinamicos.eventId]);

  const handleDelete = async () => {
    try {
        await service.delete(
          `/events/${parametrosDinamicos.eventId}`
        );
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="pageDiv">
      <div>Event Details</div>
      <h1>{event.organizer}</h1>
      <h2>{event.name}</h2>
      <h3>{event.date}</h3>
      <h3>{event.time}</h3>
      <p>{event.description}</p>
      <p>{event.participants}</p>


      <button id="btnDelete" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EventDetails;
