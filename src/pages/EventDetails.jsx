import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import service from "../services/config.services";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/auth.context";

function EventDetails(props) {
  const { userRole } = useContext(AuthContext);
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

  let date = new Date(event.date);

  return (
    <div className="pageDiv" id="eventDetails">
      <h1 className="shelterName">{event.organizer.name}</h1>
      <h2 className="animalName">{event.name}</h2>
      <div className="infoAnimal">
      <h3 className="date">{date.toDateString()} at {event.time}</h3>
      <p className="description">{event.description}</p>
      </div>
      <h2>People to help:</h2>
      {event.participants.map((eachParticipant) => {
        return <p className="nameUserList">{eachParticipant.name}</p>;
      })}

      {userRole === "admin" ? (
        <div className="rowButtons">
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/events/edit/${parametrosDinamicos.eventId}`}>
            <button className="btnEdit">Edit</button>
          </Link>
        </div>
      ) : (
        <button className="btnUser" onClick={handleParticipate}>
          Participate 
        </button>
      )}
      <Link to="/events">
        <button className="btnBack">Back</button>
      </Link>
    </div>
  );
}

export default EventDetails;
