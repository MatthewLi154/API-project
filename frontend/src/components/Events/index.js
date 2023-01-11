import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents, fetchSingleEvent } from "../../store/events";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./Events.css";

const Events = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Get from state
  const eventSelectorObj = useSelector((state) => state.events);
  const events = useSelector((state) => state.events.allEvents);
  const [expandMap, setExpandMap] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const eventsObj = eventSelectorObj;
  let eventsArr = [];

  // Put events into an array for JSX
  for (const event in eventsObj.allEvents) {
    eventsArr.push(eventsObj.allEvents[event]);
  }

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const parseDayTime = (dayTimeString) => {
    const [date, time] = dayTimeString.split("T");
    const [year, month, day] = date.split("-");
    const [hourTime, minute, seconds] = time.split(":");
    let newDate = new Date(year, month, day);
    let dayOfWeek = newDate.getDay();
    let week = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
    let monthStr = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ];

    let AMPM = "PM PDT";
    let parsedhourTime = hourTime;
    if (hourTime > 12) {
      parsedhourTime = hourTime - 12;
      AMPM = "AM PDT";
    }

    let newDayTimeString = `${week[dayOfWeek]}, ${
      monthStr[month - 1]
    } ${day} · ${parsedhourTime}:${minute} ${AMPM}`;
    return newDayTimeString;
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  let addressArr = [];
  for (const event in events) {
    if (events[event].Venue.city === "San Diego") {
      let address = `${events[event].Venue.address}, San Diego, CA`;
      addressArr.push(address);
    }
  }

  const addressEx = `1640 Camino Del Rio N, San Diego, CA 92108`;

  //DO NOT USE, MANY GEOCODE API REQUESTS
  // fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEx}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((jsonData) => {
  //     setLat(jsonData.results[0].geometry.location.lat);
  //     setLng(jsonData.results[0].geometry.location.lng);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const center = { lat: 32.7157, lng: -117.1611 };

  const onMarkerClick = (key) => {
    console.log(key);
  };

  return (
    <>
      <div className="eventBody">
        <div className="allEventsContainer">
          <div className="eventsGroupsContainer">
            <div className="eventsToggleContainer">
              <NavLink
                to="/events"
                style={{ textDecoration: "underline", color: "#008294" }}
              >
                Events
              </NavLink>
            </div>
            <div className="groupsToggleContainer">
              <NavLink
                to="/groups"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Groups
              </NavLink>
            </div>
          </div>
          {eventsArr.length > 0 &&
            eventsArr.map((event) => (
              <NavLink
                to={`/events/${event.id}`}
                style={{ textDecoration: "none" }}
                key={event.id}
              >
                <div className="SingleEventContainer" key={event.id}>
                  <div className="eventCard">
                    <div className="EventLeftImg">
                      {event.previewImage !== "no image" ? (
                        <img src={event.previewImage}></img>
                      ) : (
                        <img src="https://img3.stockfresh.com/files/i/imagedb/m/79/6143587_stock-photo-pims20100729as0027jpg.jpg"></img>
                      )}
                    </div>
                    <div className="EventRightText">
                      <div className="startDate">
                        {parseDayTime(event.startDate)}
                      </div>
                      <div className="eventTitle">
                        <h2>{event.name}</h2>
                      </div>
                      <div className="eventLocation">
                        {event.Venue ? (
                          <h3>
                            {event.Group?.name} · {event.Venue.city},{" "}
                            {event.Venue?.state}
                          </h3>
                        ) : (
                          <h3>Online</h3>
                        )}
                      </div>
                      <div className="numAttendees">
                        <h4>{event.numAttending} attendees</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
        <div className="relevant-map-container">
          <div>Find events near</div>
          <div
            style={{
              fontSize: "24px",
              color: "black",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>San Diego, CA</div>
            <div
              style={{
                fontSize: "16px",
                color: "#008294",
                display: "flex",
                alignItems: "flex-end",
                cursor: "pointer",
              }}
              onClick={(e) => {
                setExpandMap(!expandMap);
              }}
            >
              {!expandMap ? <div>Expand Map</div> : <div>Reset</div>}
            </div>
          </div>
          <div className="google-maps-container">
            {isLoaded &&
              (expandMap ? (
                <GoogleMap
                  center={center}
                  zoom={12}
                  mapContainerStyle={{ width: "24rem", height: "36rem" }}
                  options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                  }}
                  onClick={(key) => onMarkerClick(key)}
                >
                  <Marker position={center} key="hello" />
                  <Marker position={{ lat: 32.707, lng: -117.163 }} />
                  <Marker position={{ lat: 32.734, lng: -117.15 }} />
                </GoogleMap>
              ) : (
                <GoogleMap
                  center={center}
                  zoom={12}
                  mapContainerStyle={{ width: "24rem", height: "10rem" }}
                  options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                  }}
                >
                  <Marker position={center} onClick={onMarkerClick} />
                  <Marker position={{ lat: 32.707, lng: -117.163 }} />
                  <Marker position={{ lat: 32.734, lng: -117.15 }} />
                </GoogleMap>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
