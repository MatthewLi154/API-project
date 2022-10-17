import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import "./CreateGroup.css";

const CreateGroup = () => {
  return (
    <>
      <div className="mainContainer">
        <div className="becomeAnOrganizer">
          <h2>BECOME AN ORGANIZER</h2>
        </div>
        <div className="helpText">
          <span>
            We'll walk you through a few steps to build your local community
          </span>
        </div>
        <NavLink
          to="/groups/create/setLocation"
          style={{ textDecoration: "none", color: "white" }}
        >
          <button className="getStartedButton">Get Started</button>
        </NavLink>
      </div>
    </>
  );
};

export default CreateGroup;
