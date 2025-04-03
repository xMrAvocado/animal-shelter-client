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
      <h1 className="title">EVENT LIST</h1>
      <div id="animalEventCSS">
        {listEvents
          .map((eachEvent) => {
            let date = new Date(eachEvent.date);
            return (
                <div id="eachEventList">
                    <h2 className="shelterName">{eachEvent.organizer.name}</h2> 
                  <h2>{eachEvent.name}</h2>
                  <h2 className="date">{date.toDateString()} at {eachEvent.time}</h2>
                  {/*<p>{eachEvent.participants}</p>*/}
                  <Link key={eachEvent._id} to={`/events/${eachEvent._id}`}><button className="detailsButton">Details</button></Link>
                </div>
            );
          })}
      </div>
    </div>
  );
}

export default EventList;