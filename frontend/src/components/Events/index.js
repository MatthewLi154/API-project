import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents } from "../../store/events";
import "./Events.css";

const Events = () => {
  const dispatch = useDispatch();

  // Get from state
  const eventSelectorObj = useSelector((state) => state.events);
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
    const [hour, minute, seconds] = time.split(":");
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
    if (hour > 12) {
      hour = hour - 12;
      AMPM = "AM PDT";
    }

    let newDayTimeString = `${week[dayOfWeek]}, ${
      monthStr[month - 1]
    } ${day} · ${hour}:${minute} ${AMPM}`;
    return newDayTimeString;
  };

  return (
    <>
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
            <NavLink to={""} style={{ textDecoration: "none" }} key={event.id}>
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
                          {event.Group.name} · {event.Venue.city},{" "}
                          {event.Venue.state}
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
    </>
  );
};

export default Events;
