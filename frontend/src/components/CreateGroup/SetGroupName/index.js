import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupName.css";

const SetGroupName = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  const [groupName, setGroupName] = useState(
    newGroupObj.groupName || "Weeb Meet Up Group"
  );
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    // const newGroupObj = location.state?.newGroupObj;
    console.log(newGroupObj);
  }, []);

  const validate = () => {
    const errors = [];

    if (groupName.length === 0) {
      errors.push("Please enter your group name.");
    } else if (groupName.length > 50) {
      errors.push("Group name is too long. Please use 50 characters or less");
    }

    if (errors.length > 0) setErrorMessages(errors);

    return errors;
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
        <div className="progressBarStep2"></div>
      </div>
      <div className="step1">
        <span>STEP 2 OF 7</span>
      </div>
      <div className="mainContainerSetName">
        <h1>What will your group's name be?</h1>
        {errorMessages.length > 0 && (
          <ul className="errorListName">
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <h3>
          Choose a name that will give people a clear idea of what the group is
          about. Feel free to get creative! You can edit this later if you
          change your mind.
        </h3>
        <div className="setGroupNameInput">
          <form
            className="setGroupNameForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="What is your group name?"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                newGroupObj.groupName = groupName;
                // console.log(newGroupObj);
              }}
            />
          </form>
        </div>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainerSetName">
          <NavLink
            to={{
              pathname: "/groups/create/setLocation",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button
              className="backButtonSetName"
              onClick={() => {
                setGroupName(groupName);
                newGroupObj.groupName = groupName;
              }}
            >
              Back
            </button>
          </NavLink>
          <NavLink
            to={{
              pathname: "/groups/create/setDescription",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button
              onClick={(e) => {
                setGroupName(groupName);
                newGroupObj.groupName = groupName;
                console.log(newGroupObj);
                onSubmit(e);
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

export default SetGroupName;
