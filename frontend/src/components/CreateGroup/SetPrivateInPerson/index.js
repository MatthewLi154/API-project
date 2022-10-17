import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetPrivateInPerson.css";

const SetPrivateInPerson = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  const [privateGroup, setPrivateGroup] = useState(false);
  const [inPerson, setInPerson] = useState("In person");

  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBar4"></div>
      </div>
      <div className="step4">
        <span>STEP 4 OF 7</span>
      </div>
      <div className="mainContainerPrivateInPerson">
        <div>
          <h1>Final Steps...</h1>
        </div>
        <div>
          <h3>Is this an in person or online group?</h3>
        </div>
        <div>
          <h3>Is this group private or public?</h3>
        </div>
        <div>
          <h3>Please add in image url for your group below:</h3>
          <input type="text" />
        </div>
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
              //   onClick={() => {
              //     setDescription(description);
              //     newGroupObj.groupDescription = description;
              //   }}
            >
              Back
            </button>
          </NavLink>
          <NavLink
            to={
              {
                //   pathname: "/groups/create/setPrivateInPerson",
                //   state: { newGroupObj: newGroupObj },
              }
            }
          >
            <button
            //   onClick={() => {
            //     setDescription(description);
            //     newGroupObj.groupDescription = description;
            //     console.log(newGroupObj);
            //   }}
            >
              Next
            </button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetPrivateInPerson;
