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
import { fetchAllEvents } from "../../store/events";

const SingleGroup = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // use
  const groupDataObj = useSelector((state) => state.groups.singleGroup);
  const currentUser = useSelector((state) => state.session.user);
  const groupMembersArr = useSelector((state) => state.groups.members);

  let members;
  if (groupMembersArr) {
    members = groupMembersArr?.Members;
  }

  console.log(members);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSingleGroup(id));
    dispatch(fetchMembers(id));
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const onDelete = async (e) => {
    e.preventDefault();

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
  isOrganizer = currentUser.id === groupDataObj?.organizerId ? true : false;

  // check if currentUser.id === membersid and if Membership status = member or co-host
  let isMember;
  members?.forEach((member) => {
    if (
      member.id === currentUser.id &&
      (member.Membership.status === "co-host" ||
        member.Memebership.status === "member")
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
                <div>
                  <h2>Members</h2>
                  <h3>
                    <ul>
                      <li>List members here</li>
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
