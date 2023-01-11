import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SingleEvent.css";
import {
  fetchAllEvents,
  fetchSingleEvent,
  deleteSingleEvent,
} from "../../store/events";
import { fetchMembers } from "../../store/groups";
import { fetchGroups } from "../../store/groups";
import { fetchAttendees } from "../../store/attendees";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import JoinEvent from "./JoinEvent";

const SingleEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const singleEventObj = useSelector((state) => state.events.singleEvent);
  const allGroupsArr = useSelector((state) => state.groups.allGroups);
  const sessionUser = useSelector((state) => state.session.user);
  const allEvents = useSelector((state) => state.events.allEvents);
  const attendees = useSelector((state) =>
    Object.values(state.attendees.eventAttendees)
  );

  const [members, setMembers] = useState({});
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const userId = sessionUser.id;
  const userFirstName = sessionUser.firstName;
  const userLastName = sessionUser.lastName;

  useEffect(() => {
    const dispatchAll = async () => {
      await dispatch(fetchAllEvents());
      const singleEvent = await dispatch(fetchSingleEvent(eventId));
      await dispatch(fetchGroups());
      await dispatch(fetchAttendees(eventId));

      const fetchMembers = async () => {
        const response = await fetch(
          `/api/groups/${singleEvent.groupId}/members`
        );
        const data = await response.json();
        setMembers(data.Members);
        return data;
      };

      fetchMembers().catch(console.error);
    };

    dispatchAll();
  }, []);

  // Get group id from event
  let groupId = singleEventObj.groupId;

  // Normalize allGroupsArr to allGroupsObj
  let allGroupsObj = {};
  allGroupsArr?.forEach((group) => {
    allGroupsObj[group.id] = group;
  });

  // Get group preview Image
  let groupPreviewImage = allGroupsObj[groupId]?.previewImage;

  // Delete handler
  const onDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSingleEvent(eventId));
    history.push("/events");
  };

  // let eventDate;
  const parseDayTime = (dayTimeString) => {
    if (dayTimeString) {
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

      let AMPM = "PM";
      let parsedHour = hour;
      if (hour > 12) {
        parsedHour = hour - 12;
        AMPM = "AM";
      }

      let newDayTimeString = `${week[dayOfWeek]}, ${
        monthStr[month - 1]
      } ${day} · ${parsedHour}:${minute} ${AMPM}`;
      // let eventDate = `${week[dayOfWeek]}, ${monthStr[month - 1]} ${day} · ${parsedHour}:${minute} ${AMPM}`;
      return newDayTimeString;
    }
  };

  let eventStartDate = parseDayTime(singleEventObj?.startDate);
  let eventEndDate = parseDayTime(singleEventObj.endDate);

  let groupEvents = [];
  for (const key in allEvents) {
    if (allEvents[key].groupId == groupId) {
      groupEvents.push(allEvents[key]);
    }
  }

  // validate current session user and organizer

  // get organizerId from allGroupsArr by iterating through the array until groupId matches
  let isOrganizer;
  isOrganizer =
    allGroupsObj[groupId]?.organizerId === sessionUser?.id ? true : false;

  // isOrganizer = currentUser?.id === groupDataObj?.organizerId ? true : false;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // const center = { lat, lng };

  // confirm if user is member of group by interating through members arr
  let isMember = false;
  for (const member in members) {
    if (
      members[member].firstName === userFirstName &&
      members[member].lastName === userLastName
    ) {
      isMember = true;
    }
  }

  // Define set of google map markers since geocoding is expensive
  // if (singleEventObj.Venue.city === )

  let center;
  switch (singleEventObj.Venue?.city) {
    case "Riverside":
      center = { lat: 33.95, lng: -117.396 };
      break;
    case "Chino":
      center = { lat: 33.989, lng: -117.732582 };
      break;
    case "San Diego":
      center = { lat: 32.7157, lng: -117.161 };
      break;
    case "San Francisco":
      center = { lat: 37.733, lng: -122.4467 };
      break;
    case "Los Angeles":
      center = { lat: 34.052235, lng: -118.243683 };
      break;
    default:
      center = { lat: 40.75929, lng: -73.985573 };
  }

  return (
    <>
      <div className="singleEventContainerPage">
        {singleEventObj && (
          <div className="eventDetailsPageContainer">
            <div className="eventHeader">
              {/* <i class="fa-solid fa-arrow-left-long"></i> */}
              <div className="singleEventTitle">
                <h1>{singleEventObj.name}</h1>
              </div>
              <div className="hostSection">
                <div className="hostPicture">
                  <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"></img>
                </div>
                <div className="hostedByOrganizerSection">
                  <div className="hostedBy">
                    <h3>Hosted by</h3>
                  </div>
                  <div className="hostName">
                    <h3>{singleEventObj.Group?.name}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="middleSectionEventDetails">
              <div className="eventDetailsLeft">
                <div>
                  {singleEventObj.EventImages?.length ? (
                    <img src={singleEventObj.EventImages[0]?.url}></img>
                  ) : (
                    <img src="https://thumbs.dreamstime.com/b/text-upcoming-events-written-notepad-office-desk-comput-text-upcoming-events-written-notepad-office-desk-118864463.jpg"></img>
                  )}
                </div>
                <div>
                  <h2>Details</h2>
                </div>

                <div>
                  <p>{singleEventObj.description}</p>
                </div>
                <div>
                  <h2>Attendees {`(${attendees.length})`}</h2>
                </div>
                <div className="attendees-main-container">
                  {attendees.length > 0 ? (
                    attendees.map((attendee) => (
                      <div className="attendee-card">
                        <img
                          src={attendee.profileImg}
                          style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                          }}
                        ></img>
                        <div className="attendee-name">
                          <h4>
                            {attendee.firstName} {attendee.lastName}
                          </h4>
                        </div>
                        <div className="attendee-status">
                          <h4>{attendee.Attendance.status}</h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontFamily: "arial", fontWeight: "600" }}>
                      Be the first to join!
                    </div>
                  )}
                </div>
              </div>
              <div className="eventDetailsRight">
                <div>
                  <NavLink
                    to={`/groups/${groupId}`}
                    style={{ textDecoration: "none", color: "none" }}
                  >
                    <div className="eventGroupCard">
                      <div className="eventGroupImgLeft">
                        <img src={groupPreviewImage}></img>
                      </div>
                      <div className="rightSideGroupNamePrivate">
                        <div className="eventGroupName">
                          <h3>{allGroupsObj[groupId]?.name}</h3>
                        </div>
                        <div className="eventGroupPrivate">
                          {allGroupsObj[groupId]?.private ? (
                            <h3>Private</h3>
                          ) : (
                            <h3>Public</h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <div className="eventLocationTime">
                    <div className="topDate">
                      <div className="timeLogo">
                        <i class="fa-regular fa-clock"></i>
                      </div>
                      <div className="dateBlock">
                        <span>
                          {eventStartDate} TO {eventEndDate}
                        </span>
                      </div>
                    </div>
                    <div className="bottomLocation">
                      <div className="locationLogo">
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      {singleEventObj.Venue !== null ? (
                        <div className="locationAddress">
                          {singleEventObj.Venue?.address} ·{" "}
                          {singleEventObj.Venue?.city},{" "}
                          {singleEventObj.Venue?.state}
                        </div>
                      ) : (
                        <div className="locationAddress">Online</div>
                      )}
                    </div>
                  </div>
                  <div className="google-maps-container">
                    {isLoaded && (
                      <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: "24rem", height: "24rem" }}
                        options={{
                          mapTypeControl: false,
                          streetViewControl: false,
                          fullscreenControl: false,
                        }}
                      >
                        <Marker position={center} />
                      </GoogleMap>
                    )}
                  </div>
                  {isOrganizer && (
                    <div className="deleteButtonContainer">
                      <button
                        onClick={(e) => {
                          onDelete(e);
                        }}
                      >
                        Delete Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="event-join-footer-container">
        <JoinEvent
          props={{
            eventStartDate,
            title: singleEventObj.name,
            price: singleEventObj.price,
            eventId: eventId,
            userId: sessionUser.id,
            attendees: attendees,
            groupId: groupId,
            isMember: isMember,
          }}
        />
      </div>
    </>
  );
};

export default SingleEvent;
