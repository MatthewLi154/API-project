import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SingleEvent.css";
import {
  fetchAllEvents,
  fetchSingleEvent,
  deleteSingleEvent,
} from "../../store/events";
import { fetchGroups, fetchMembers } from "../../store/groups";
// import { fetchAttendees } from "../../store/attendees";
import { csrfFetch } from "../../store/csrf";
// import { useLoadScript } from "@react-google-maps/api";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const SingleEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const singleEventObj = useSelector((state) => state.events.singleEvent);
  const allGroupsArr = useSelector((state) => state.groups.allGroups);
  const sessionUser = useSelector((state) => state.session.user);
  const groupMembersArr = useSelector((state) => state.groups.members);
  const allEvents = useSelector((state) => state.events.allEvents);
  // const attendees = useSelector((state) => state.attendees);

  const [isMember, setIsMember] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchSingleEvent(eventId));
    dispatch(fetchGroups());
    // dispatch(fetchAttendees(eventId));
  }, [dispatch]);

  useEffect(() => {
    const data = fetchEventAttendees();
    setAttendees(data);
  }, []);

  // Normalize allGroupsArr to allGroupsObj
  let allGroupsObj = {};
  allGroupsArr?.forEach((group) => {
    allGroupsObj[group.id] = group;
  });

  // Get group id from event
  let groupId = singleEventObj.groupId;

  // Get group preview Image
  let groupPreviewImage = allGroupsObj[groupId]?.previewImage;

  // Delete handler
  const onDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSingleEvent(eventId));
    history.push("/events");
  };

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

  const fetchEventAttendees = async () => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`);

    if (response.ok) {
      const data = await response.json();

      // normalize array
      let attendees = {};
      let attendeesArr = data.Attendees;

      for (const attendee of attendeesArr) {
        attendees[attendee.id] = attendee;
      }

      setAttendees(attendeesArr);
      return attendees;
    }
  };

  // validate current session user and organizer

  // get organizerId from allGroupsArr by iterating through the array until groupId matches
  let isOrganizer;
  isOrganizer =
    allGroupsObj[groupId]?.organizerId === sessionUser?.id ? true : false;

  // isOrganizer = currentUser?.id === groupDataObj?.organizerId ? true : false;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  if (!isLoaded) {
    <div>Loading...</div>;
  }

  const address = `${singleEventObj.Venue.address}, ${singleEventObj.Venue.city}, ${singleEventObj.Venue.state}`;

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      // console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
      setLat(jsonData.results[0].geometry.location.lat);
      setLng(jsonData.results[0].geometry.location.lng);
    })
    .catch((error) => {
      console.log(error);
    });

  const center = { lat, lng };

  return (
    <>
      <div className="singleEventContainerPage">
        {singleEventObj && (
          <div className="eventDetailsPageContainer">
            <div className="eventHeader">
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
                  <h2>Attendees</h2>
                </div>
                <div className="attendees-main-container">
                  {attendees.length > 0 &&
                    attendees.map((attendee) => (
                      <div className="attendee-card">
                        <div className="attendee-name">
                          <h4>
                            {attendee.firstName} {attendee.lastName}
                          </h4>
                        </div>
                        <div className="attendee-status">
                          <h4>{attendee.Attendance.status}</h4>
                        </div>
                      </div>
                    ))}
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
    </>
  );
};

export default SingleEvent;
