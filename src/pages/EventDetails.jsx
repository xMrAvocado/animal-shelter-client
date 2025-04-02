import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import service from "../services/config.services";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/auth.context";

function EventDetails(props) {
  const {userRole} = useContext(AuthContext)
  const parametrosDinamicos = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

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
  useEffect(() => {
    getData();
  }, [parametrosDinamicos.eventId]);

  const handleDelete = async () => {
    let text = "Are you sure you want to delete it?";
    if (confirm(text) == true) {
      try {
        await service.delete(`/events/${parametrosDinamicos.eventId}`);

        navigate(`/events`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleParticipate = async () => {
    try {
      await service.patch(
        `/events/${parametrosDinamicos.eventId}/participants`
      );
      getData();
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
        <ClipLoader color="green" />
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
      {event.participants.map((eachParticipant) => {
        return <p>{eachParticipant.name}</p>;
      })}

      {userRole === "admin" ? (
        <>
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/events/edit/${parametrosDinamicos.eventId}`}>
            <button className="btnEdit">Edit</button>
          </Link>
        </>
      ) : (
        <button id="btnParticipate" onClick={handleParticipate}>
          Participate
        </button>
      )}
    </div>
  );
}

export default EventDetails;
