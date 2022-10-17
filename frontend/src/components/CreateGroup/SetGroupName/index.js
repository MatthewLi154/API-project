import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupName.css";

const SetGroupName = () => {
  const [groupName, setGroupName] = useState("");
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;

  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBarStep2"></div>
      </div>
      <div className="step1">
        <span>STEP 2 OF 7</span>
      </div>
      <div className="mainContainerSetName">
        <h1>What will your group's name be?</h1>
        <h3>
          Choose a name that will give people a clear idea of what the group is
          about. Feel free to get creative! You can edit this later if you
          change your mind.
        </h3>
        <div className="setGroupNameInput">
          <form className="setGroupNameForm">
            <input
              type="text"
              placeholder="What is your group name?"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                console.log(newGroupObj);
              }}
            />
          </form>
        </div>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainerSetName">
          <NavLink to="/groups/create/setLocation">
            <button className="backButtonSetName">Back</button>
          </NavLink>
          <NavLink to="">
            <button>Next</button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetGroupName;
