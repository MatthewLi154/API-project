import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleGroup,
  fetchGroups,
  deleteGroup,
  fetchMembers,
} from "../../store/groups";
import "./SingleGroup.css";
import { deleteSingleEvent, fetchAllEvents } from "../../store/events";
import JoinGroup from "./JoinGroup";
import GroupImages from "./GroupImages";

const SingleGroup = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const groupDataObj = useSelector((state) => state.groups.singleGroup);
  const currentUser = useSelector((state) => state.session.user);
  const groupMembersArr = useSelector((state) => state.groups?.members);
  const allEvents = useSelector((state) => state.events.allEvents);
  const sessionUser = useSelector((state) => state.session.user);
  const groupImages = useSelector(
    (state) => state.groups.singleGroup?.GroupImages
  );

  const userId = sessionUser.id;
  const userFirstName = sessionUser.firstName;
  const userLastName = sessionUser.lastName;
  const membersArr = groupMembersArr?.Members;

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSingleGroup(id));
    dispatch(fetchAllEvents());
    dispatch(fetchMembers(id));
  }, [dispatch, currentUser, allEvents]);

  let currentData;
  if (groupDataObj) {
    currentData = {
      name: groupDataObj.name,
      location: `${groupDataObj.city}, ${groupDataObj.state}`,
      privated: groupDataObj.private,
      type: groupDataObj.type,
      description: groupDataObj.about,
    };
    localStorage.setItem("groupEditName", groupDataObj.name);
    localStorage.setItem("groupEditLocation", currentData.location);
    localStorage.setItem("groupEditDescription", groupDataObj.about);
    localStorage.setItem("groupEditType", groupDataObj.type);
    localStorage.setItem("groupEditPrivateGroup", groupDataObj.private);
  }

  let groupEvents = [];
  for (const key in allEvents) {
    if (allEvents[key].groupId == id) {
      groupEvents.push(allEvents[key]);
    }
  }

  if (allEvents) {
    let groupArr = Object.entries(allEvents);
  }

  let members;
  if (groupMembersArr) {
    members = groupMembersArr?.Members;
  }

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
    let parsedHour = hour;
    if (hour > 12) {
      parsedHour = hour - 12;
      AMPM = "AM PDT";
    }

    let newDayTimeString = `${week[dayOfWeek]}, ${
      monthStr[month - 1]
    } ${day} ?? ${parsedHour}:${minute} ${AMPM}`;
    return newDayTimeString;
  };

  const onDelete = async (e) => {
    e.preventDefault();

    for (let i = 0; i < groupEvents.length; i++) {
      await dispatch(deleteSingleEvent(groupEvents[i].id));
    }

    await dispatch(deleteGroup(id));

    await dispatch(fetchAllEvents());

    history.push("/groups");
  };

  const onCreateEvent = async (e) => {
    e.preventDefault();

    history.push(`/groups/${id}/events/create`);
  };

  // validate current session user and organizer
  let isOrganizer;
  isOrganizer = sessionUser?.id === groupDataObj?.organizerId ? true : false;

  // check if currentUser.id === membersid and if Membership status = member or co-host
  let isMember = false;
  members?.forEach((member) => {
    if (
      member?.id === currentUser?.id &&
      (member.Membership?.status === "co-host" ||
        member.Memebership?.status === "member")
    ) {
      isMember = true;
    }
  });

  return (
    <>
      <div className="groupBody">
        {groupDataObj && (
          <div className="pageContainer">
            {/* <div>{groupDataObj.name}</div> */}
            <div className="upperSectionDetails">
              <div className="leftImgContainer">
                {groupDataObj.GroupImages && (
                  <img src={groupDataObj.GroupImages[0]?.url}></img>
                )}
              </div>
              <div className="rightSectionDetails">
                <div className="groupName">
                  <h1>{groupDataObj.name}</h1>
                </div>
                <div className="groupDetailContainer">
                  <div className="groupLocation">
                    <h3>
                      {groupDataObj.city}, {groupDataObj.state}
                    </h3>
                  </div>
                  <div className="groupNumMembersPrivate">
                    <h3>
                      {groupDataObj.numMembers} members ??{" "}
                      {groupDataObj.private ? `Private Group` : `Public Group`}
                    </h3>
                  </div>
                  <div className="groupOrganizer">
                    {groupDataObj.Organizer && (
                      <div>
                        <h3>
                          Organized by {groupDataObj.Organizer.firstName}{" "}
                          {groupDataObj.Organizer.lastName}
                        </h3>
                      </div>
                    )}
                  </div>
                  <div className="groupShare"></div>
                </div>
              </div>
            </div>
            {(isOrganizer || isMember) && (
              <div className="centerButtonsContainer">
                <div className="centerButtons">
                  <div className="createEventButton">
                    <button
                      onClick={(e) => {
                        onCreateEvent(e);
                      }}
                    >
                      Create Event
                    </button>
                  </div>

                  {isOrganizer && (
                    <div className="deleteEditButtons">
                      <div>
                        <NavLink
                          to={{
                            pathname: `/groups/${groupDataObj.id}/edit`,
                            state: { currentData: currentData },
                          }}
                        >
                          <button>Edit</button>
                        </NavLink>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            onDelete(e);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!isOrganizer && (
              <JoinGroup
                props={{
                  isOrganizer,
                  id,
                  userId,
                  membersArr,
                  userFirstName,
                  userLastName,
                }}
              />
            )}
            <div className="middleSectionMain">
              <div className="middleSectionContainer">
                <div className="middleSectionLeftSide">
                  <div>
                    <h2>What we're about</h2>
                  </div>
                  <div>
                    <p>{groupDataObj.about}</p>
                  </div>
                  {groupEvents.length > 0 && (
                    <div className="upcomingEventsContainer">
                      <div className="groupUpcomingEvents">
                        <h2>
                          Upcoming Events{" "}
                          {groupEvents !== null && (
                            <span>{`(${groupEvents.length})`}</span>
                          )}
                        </h2>
                      </div>

                      {groupEvents.length > 0 &&
                        groupEvents.map((event) => (
                          <NavLink
                            to={`/events/${event.id}`}
                            style={{ textDecoration: "none", color: "none" }}
                            key={event?.id}
                          >
                            <div key={event.id} className="upcomingEventsCard">
                              <div className="eventDateAndTime">
                                <div>
                                  <i class="fa-regular fa-clock"></i>
                                </div>
                                <div className="dateTimeText">
                                  {parseDayTime(event?.startDate)}
                                </div>
                              </div>
                              <div className="eventName">{event?.name}</div>
                              <div className="groupEventLocation">
                                {event?.Venue === null ? (
                                  <div>Online</div>
                                ) : (
                                  <div>
                                    {event?.Venue?.city}, {event?.Venue?.state}
                                  </div>
                                )}
                              </div>
                              <div className="groupEventNumAttendees">
                                <div>{event.numAttending} attendees</div>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                      <div>
                        <h2>Photos</h2>
                        <GroupImages props={{ groupImages }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="middleSectionRightSide">
                  <div>
                    <h2>Organizers</h2>
                    {groupDataObj.Organizer && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        <div>
                          <img
                            src={groupDataObj.Organizer.profileImg}
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <h3>
                          {groupDataObj.Organizer.firstName}{" "}
                          {groupDataObj.Organizer.lastName}
                        </h3>
                      </div>
                    )}
                  </div>
                  <div className="membersContainer">
                    <h2>Members</h2>
                    <h3>
                      {sessionUser ? (
                        <ul className="memberList">
                          {members?.length > 0 &&
                            members?.map((member) => (
                              <li key={member.id}>
                                {/* {member.firstName} {member.lastName} ??{" "} */}
                                <img
                                  src={member.profileImg}
                                  style={{
                                    width: "3rem",
                                    height: "3rem",
                                    borderRadius: "50%",
                                  }}
                                ></img>
                                {/* <span className="memberLi">
                                  {member.Membership?.status}
                                </span> */}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <div className="memberList">
                          <span>Must be logged in to see members</span>
                        </div>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleGroup;
