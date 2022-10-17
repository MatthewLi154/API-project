import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupDescription.css";

const SetGroupDescription = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  const [description, setDescription] = useState(
    newGroupObj.groupDescription || ""
  );
  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBar3"></div>
      </div>
      <div className="step3">
        <span>STEP 3 OF 7</span>
      </div>
      <div className="mainContainerSetDescription">
        <h1>Now describe what {newGroupObj.groupName} will be about</h1>
        <h3>
          People will see this when we promote your group, but you'll be able to
          add to it later, too.
        </h3>
        <ol>
          <li>What's the purpose of the group?</li>
          <li>Who should join?</li>
          <li>What will you do at your events?</li>
        </ol>
        <form>
          <div>
            <textarea
              placeholder="Please write at least 50 characters"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </form>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainerSetName">
          <NavLink
            to={{
              pathname: "/groups/create/setName",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button
              className="backButtonSetName"
              onClick={() => {
                setDescription(description);
                newGroupObj.groupDescription = description;
              }}
            >
              Back
            </button>
          </NavLink>
          <NavLink
            to={{
              pathname: "/groups/create/setPrivateInPerson",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button
              onClick={() => {
                setDescription(description);
                newGroupObj.groupDescription = description;
                console.log(newGroupObj);
              }}
            >
              Next
            </button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetGroupDescription;
