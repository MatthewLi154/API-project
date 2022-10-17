import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupLocation.css";
import SetGroupName from "../SetGroupName";

const SetGroupLocation = () => {
  let newGroupObj = {};
  const [locationLoad, setLocationLoad] = useState(true);
  const [groupLocation, setGroupLocation] = useState("Pasadena, CA");
  newGroupObj.groupLocation = groupLocation;

  useEffect(() => {
    console.log(newGroupObj);
  }, [groupLocation]);

  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBar"></div>
      </div>
      <div className="step1">
        <span>STEP 1 OF 7</span>
      </div>
      <div className="mainContainer">
        <h1>First, set your group's location.</h1>
        <h3>
          Weebup groups meet locally, inperson and online. We'll connect you
          with people in your area, and more can join you online.
        </h3>
        <div className="locationContainer">
          {locationLoad ? (
            <div className="locationShown">
              <div className="location">{groupLocation}</div>
              <div className="changeLocation">
                <span
                  onClick={() => {
                    setLocationLoad(!locationLoad);
                  }}
                >
                  Change Location
                </span>
              </div>
            </div>
          ) : (
            <div>
              <form
                className="locationForm"
                onSubmit={() => {
                  setLocationLoad(!locationLoad);
                  setGroupLocation(groupLocation);
                  //   console.log(newGroupObj);
                }}
              >
                <input
                  type="text"
                  placeholder="City, STATE"
                  value={groupLocation}
                  onChange={(e) => {
                    setGroupLocation(e.target.value);
                  }}
                />
              </form>
            </div>
          )}
        </div>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainer">
          <NavLink
            to={{
              pathname: "/groups/create/setName",
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

export default SetGroupLocation;
