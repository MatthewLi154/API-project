import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleGroup,
  fetchGroups,
  deleteGroup,
  fetchMembers,
} from "../../store/groups";
import "./SingleGroup.css";
import { deleteSingleEvent, fetchAllEvents } from "../../store/events";

const SingleGroup = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // use
  const groupDataObj = useSelector((state) => state.groups.singleGroup);
  const currentUser = useSelector((state) => state.session.user);
  const groupMembersArr = useSelector((state) => state.groups.members);
  const allEvents = useSelector((state) => state.events?.allEvents);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSingleGroup(id));
    dispatch(fetchMembers(id));
    dispatch(fetchAllEvents());
  }, [dispatch]);

  console.log(allEvents);
  let groupEvents = [];
  for (const key in allEvents) {
    if (allEvents[key].groupId == id) {
      groupEvents.push(allEvents[key]);
    }
  }

  console.log(groupEvents);

  let members;
  if (groupMembersArr) {
    members = groupMembersArr?.Members;
  }

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
  isOrganizer = currentUser?.id === groupDataObj?.organizerId ? true : false;

  // check if currentUser.id === membersid and if Membership status = member or co-host
  let isMember;
  members?.forEach((member) => {
    if (
      member.id === currentUser.id &&
      (member.Membership?.status === "co-host" ||
        member.Memebership?.status === "member")
    ) {
      isMember = true;
    }
  });

  return (
    <>
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
                    {groupDataObj.numMembers} members ·{" "}
                    {groupDataObj.private ? `Private Group` : `Public Group`}
                  </h3>
                </div>
                <div className="groupOrganizer">
                  {groupDataObj.Organizer && (
                    <h3>
                      Organized by {groupDataObj.Organizer.firstName}{" "}
                      {groupDataObj.Organizer.lastName}
                    </h3>
                  )}
                </div>
                <div className="groupShare"></div>
              </div>
            </div>
          </div>
          {(isMember || isOrganizer) && (
            <div className="centerButtonsContainer">
              <div className="centerButtons">
                {isMember && (
                  <div className="createEventButton">
                    <button
                      onClick={(e) => {
                        onCreateEvent(e);
                      }}
                    >
                      Create Event
                    </button>
                  </div>
                )}
                {isOrganizer && (
                  <div className="deleteEditButtons">
                    <div>
                      <NavLink to={`/groups/${groupDataObj.id}/edit`}>
                        {" "}
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
          <div className="middleSectionMain">
            <div className="middleSectionContainer">
              <div className="middleSectionLeftSide">
                <div>
                  <h2>What we're about</h2>
                </div>
                <div>
                  <p>{groupDataObj.about}</p>
                </div>
                <div className="upcomingEventsContainer">
                  <div className="groupUpcomingEvents">
                    <h2>Upcoming Events</h2>
                  </div>
                  {allEvents && (
                    <div className="upcomingEventsCard">
                      <div className="eventDateAndTime">
                        <span>
                          {/* <i class="fa-regular fa-clock"></i> */}
                          SATURDAY
                        </span>
                      </div>
                      <div>event name</div>
                      <div>event location</div>
                      <div>num attendees</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="middleSectionRightSide">
                <div>
                  <h2>Organizers</h2>
                  {groupDataObj.Organizer && (
                    <h3>
                      {groupDataObj.Organizer.firstName}{" "}
                      {groupDataObj.Organizer.lastName}
                    </h3>
                  )}
                </div>
                <div className="membersContainer">
                  <h2>Members</h2>
                  <h3>
                    <ul className="memberList">
                      {members?.map((member) => (
                        <li key={member.id}>
                          {member.firstName} {member.lastName} ·{" "}
                          <span className="memberLi">
                            {member.Membership?.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGroup;
