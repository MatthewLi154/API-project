import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchAllEvents } from "../../store/events";
import "./Groups.css";

const Groups = () => {
  const allGroups = useSelector((state) => state.groups.allGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <>
      <div className="groupsContainer">
        <div className="eventsGroupsContainer">
          <div className="eventsToggleContainer">
            <NavLink
              to="/events"
              style={{ textDecoration: "none", color: "gray" }}
            >
              Events
            </NavLink>
          </div>
          <div className="groupsToggleContainer">
            <NavLink
              to="/groups"
              style={{ textDecoration: "underline", color: "#008294" }}
            >
              Groups
            </NavLink>
          </div>
        </div>
        {allGroups &&
          allGroups.map((group) => (
            <NavLink
              to={`/groups/${group.id}`}
              style={{ textDecoration: "none" }}
              key={group.id}
            >
              <div className="singleGroupContainer" key={group.id}>
                <div className="groupCard">
                  <div className="leftImg">
                    <img src={group.previewImage}></img>
                  </div>
                  <div className="rightText">
                    <div className="groupTitle">
                      <h2>{group.name}</h2>
                    </div>
                    <div className="groupLocation">
                      <h3>
                        {group.city}, {group.state}
                      </h3>
                    </div>
                    <div className="groupDescription">
                      <p>{group.about}</p>
                    </div>
                    <div className="groupNumMembers">
                      <span>
                        {group.numMembers} members ·{" "}
                        {group.private ? `Private` : `Public`}
                      </span>
                    </div>
                    <div className="status"></div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </>
  );
};

export default Groups;
