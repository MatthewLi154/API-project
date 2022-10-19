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
                    <img src={event.previewImage}></img>
                  </div>
                  <div className="EventRightText">
                    <div className="eventTitle">
                      <h2>{event.name}</h2>
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
