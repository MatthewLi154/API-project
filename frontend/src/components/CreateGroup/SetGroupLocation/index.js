import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupLocation.css";
import SetGroupName from "../SetGroupName";

const SetGroupLocation = () => {
  let newGroupObj = {};
  const [locationLoad, setLocationLoad] = useState(true);
  const [groupLocation, setGroupLocation] = useState(
    localStorage.getItem("groupLocation") || "New York, NY"
  );
  const [errorMessages, setErrorMessages] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  newGroupObj.groupLocation = groupLocation;

  useEffect(() => {
    newGroupObj.groupLocation = groupLocation;
    localStorage.setItem("groupLocation", groupLocation);
  }, [groupLocation]);

  useEffect(() => {
    setErrorMessages([]);
  }, []);

  const validate = () => {
    const errorMessages = [];

    const regex = /[A-Za-z]+[ ]?[A-Za-z]+,[ ]?[A-Z]{2}$/;

    if (!regex.test(groupLocation)) {
      errorMessages.push("Please use valid City, State (e.g. New York, NY)");
    }

    if (!sessionUser) {
      errorMessages.push("User must be logged in to create group");
    }

    if (errorMessages.length > 0) setErrorMessages(errorMessages);
    return errorMessages;
  };

  const onSubmit = (e) => {
    const errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrorMessages(errors);
    }
  };

  return (
    <>
      <div className="fullProgressBar">
        <div className="progressBar"></div>
      </div>
      <div className="step1">
        <span>STEP 1 OF 4</span>
      </div>
      <div className="mainContainer">
        <h1>First, set your group's location.</h1>
        <h3>
          Weebup groups meet locally, inperson and online. We'll connect you
          with people in your area, and more can join you online.
        </h3>
        {errorMessages.length > 0 && (
          <ul className="errorList">
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
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
            <button onClick={(e) => onSubmit(e)}>Next</button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetGroupLocation;
