import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetGroupDescription.css";

const SetGroupDescription = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  const [description, setDescription] = useState(
    localStorage.getItem("description") ||
      "This group is for all anime lovers and enjoyers. Watched Naruto and thoroughly enjoyed it? Can't get enough of wicked animation action? Check us out!"
  );
  const [errorMessages, setErrorMessages] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  const validate = () => {
    const errors = [];

    if (description.length < 30) {
      errors.push("Please write at least 30 characters.");
    }

    if (description.length > 255) {
      errors.push("Please use less than 255 characters");
    }

    if (!sessionUser) {
      errorMessages.push("User must be logged in to create group");
    }

    if (errors.length > 0) setErrorMessages(errors);
    console.log(errors);
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
        {errorMessages.length > 0 && (
          <ul className="groupDescriptionError">
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
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
              onClick={(e) => {
                setDescription(description);
                newGroupObj.groupDescription = description;
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

export default SetGroupDescription;
