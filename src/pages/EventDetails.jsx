import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function EventDetails() {
  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await service.get(
          `/events/${parametrosDinamicos.eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [parametrosDinamicos.eventId]);

  const handleDelete = async () => {
    try {
      await service.delete(`/events/${parametrosDinamicos.eventId}`);
      navigate(`/events`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleParticipate = async () => {
    try {
      await service.patch(`/events/${parametrosDinamicos.eventId}/participants`);
      navigate(`/events`);
    } catch (error) {
      console.log(error);
    }
  };

  if (event === null) {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "200px",
          alignItems: "center",
        }}
      >
        <h3>Buscando data del evento...</h3>
      </div>
    );
  }

  return (
    <div className="pageDiv">
      <div>Event Details</div>
      <h1>{event.organizer.name}</h1>
      <h2>{event.name}</h2>
      <h3>{event.date}</h3>
      <h3>{event.time}</h3>
      <p>{event.description}</p>
      <p>{event.participants}</p>

      <button id="btnParticipate" onClick={handleParticipate}>
        Participate
      </button>
      <button className="btnDelete" onClick={handleDelete}>
        Delete
      </button>
      <Link to={`/events/edit/${parametrosDinamicos.eventId}`}>
        <button className="btnEdit">Edit</button>
      </Link>
    </div>
  );
}

export default EventDetails;
