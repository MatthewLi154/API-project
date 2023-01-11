import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchAllEvents } from "../../store/events";
import "./Groups.css";
import LoginFormModal from "../LoginFormModal";
import LoginForm from "../LoginFormModal/LoginForm";

const Groups = () => {
  const allGroups = useSelector((state) => state.groups.allGroups);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLoginModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onGroupClick = (group) => {
    if (sessionUser !== null) {
      history.push(`/groups/${group.id}`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="groupsBody">
        {showLoginModal && sessionUser === null && <LoginForm />}
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
              // <NavLink
              //   to={onGroupClick(group)}
              //   style={{ textDecoration: "none" }}
              //   key={group.id}
              // >
              <div
                className="singleGroupContainer"
                key={group.id}
                onClick={() => onGroupClick(group)}
              >
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
              // </NavLink>
            ))}
        </div>
      </div>
    </>
  );
};

export default Groups;
