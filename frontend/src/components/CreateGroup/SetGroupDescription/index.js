import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupDescription.css";

const SetGroupDescription = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBar3"></div>
      </div>
      <div className="step3">
        <span>STEP 3 OF 7</span>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainerSetName">
          <NavLink
            to={{
              pathname: "/groups/create/setName",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button className="backButtonSetName">Back</button>
          </NavLink>
          <NavLink
            to={{
              pathname: "/groups/create/setDescription",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button>Next</button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetGroupDescription;
