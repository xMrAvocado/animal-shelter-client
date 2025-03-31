import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function EventList() {

  const [listEvents, setListEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await service.get(
          `/events`
        );
        setListEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="pageDiv" id="eventsContainer">
      <h1>Event List</h1>
      <div id="animalEventCSS">
        {listEvents
          .map((eachEvent) => {
            return (
                <div id="eachEventList">
                    <h2>{eachEvent.organizer}</h2> 
                  <h2>{eachEvent.name}</h2>
                  <h2>{eachEvent.date}/{eachEvent.time}</h2>
                  <p>{eachEvent.description}</p>
                  <p>{eachEvent.participants}</p>
                  <Link key={eachEvent._id} to={`/events/${eachEvent._id}`}><button>Details</button></Link>
                </div>
            );
          })}
      </div>
    </div>
  );
}

export default EventList;