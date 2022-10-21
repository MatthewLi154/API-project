import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetPrivateInPerson.css";
import {
  createSingleGroup,
  addImageToGroup,
  fetchGroups,
  fetchSingleGroup,
  getLastCreatedGroup,
} from "../../../store/groups";

const SetPrivateInPerson = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const newGroupObj = location.state?.newGroupObj;
  const [privateGroup, setPrivateGroup] = useState(
    localStorage.getItem("privateGroup") || 0
  );
  const [inPerson, setInPerson] = useState(
    localStorage.getItem("inPersonGroup") || "In person"
  );
  const [imgurl, setImgurl] = useState(localStorage.getItem("imgurl"));
  const [errorMessages, setErrorMessages] = useState([]);

  // destructure location from newGroupObj, extract city and state
  const { groupLocation, groupDescription, groupName } = newGroupObj;
  const groupLocationArr = newGroupObj.groupLocation.split(", ");
  const [city, state] = groupLocationArr;

  let groupDataObj = {};

  // Load initial state of groups
  useEffect(() => {
    dispatch(fetchGroups());
    setErrorMessages([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("privateGroup", privateGroup);
    localStorage.setItem("inPersonGroup", inPerson);
    localStorage.setItem("imgurl", imgurl);
  }, [privateGroup, inPerson, imgurl]);

  const validate = () => {
    const errorMessages = [];

    if (!imgurl) {
      errorMessages.push("Please add in an image");
    } else if (!imgurl.endsWith(".jpg")) {
      if (!imgurl.endsWith(".png")) {
        errorMessages.push("Image does not end with jpg or png.");
      }
    }

    setErrorMessages(errorMessages);
    return errorMessages;
  };

  useEffect(() => {
    // newGroupObj.groupPrivate = privateGroup;
    // newGroupObj.groupInPerson = inPerson;
    // newGroupObj.groupImage = imgurl;

    groupDataObj.name = newGroupObj.groupName;
    groupDataObj.about = newGroupObj.groupDescription;
    groupDataObj.type = inPerson;
    groupDataObj.private = privateGroup;
    groupDataObj.city = city;
    groupDataObj.state = state;
  }, [privateGroup, inPerson, imgurl]);

  // useEffect(() => {
  //   console.log(newGroupObj);
  // }, []);

  const onCreateGroup = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) return setErrorMessages(errors);

    // Update the state with new group, and set single group as created group

    groupDataObj.name = newGroupObj.groupName;
    groupDataObj.about = newGroupObj.groupDescription;
    groupDataObj.type = inPerson;
    groupDataObj.private = privateGroup;
    groupDataObj.city = city;
    groupDataObj.state = state;
    // console.log(groupDataObj);
    const createdGroup = await dispatch(createSingleGroup(groupDataObj));

    dispatch(fetchGroups());

    // use thunk to add img to newly created group
    await dispatch(addImageToGroup(createdGroup.id, imgurl));
    history.push("/groups");
  };

  // dispatch thunk to create group, then navigate to page

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
        {errorMessages.length > 0 && (
          <div>
            <ul>
              {errorMessages.map((error) => (
                <li key={error} style={{ color: "red", fontWeight: "bold" }}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h3>Is this an in person or online group?</h3>
          <select
            name="inperson"
            value={inPerson}
            onChange={(e) => {
              setInPerson(e.target.value);
            }}
          >
            {/* <option value="">Please choose an option</option> */}
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
        </div>
        <div>
          <h3>Is this group private or public?</h3>
          <select
            name="inperson"
            value={privateGroup}
            onChange={(e) => setPrivateGroup(e.target.value)}
          >
            {/* <option value="">Please choose an option</option> */}
            <option value={1}>Private</option>
            <option value={0}>Public</option>
          </select>
        </div>
        <div>
          <h3>Please add in image url for your group below:</h3>
          <input
            type="text"
            value={imgurl}
            onChange={(e) => {
              setImgurl(e.target.value);
            }}
          />
        </div>
      </div>
      <footer className="bottomSection">
        <div className="footerButtonContainerSetName">
          <NavLink
            to={{
              pathname: "/groups/create/setDescription",
              state: { newGroupObj: newGroupObj },
            }}
          >
            <button
              className="backButtonSetName"
              onClick={() => {
                newGroupObj.groupPrivate = privateGroup;
                newGroupObj.groupInPerson = inPerson;
                newGroupObj.groupImage = imgurl;
              }}
            >
              Back
            </button>
          </NavLink>
          <NavLink
            to={{
              pathname: `/groups`,
            }}
          >
            <button
              onClick={(e) => {
                // newGroupObj.groupPrivate = privateGroup;
                // newGroupObj.groupInPerson = inPerson;
                // newGroupObj.groupImage = imgurl;
                onCreateGroup(e);
              }}
            >
              Create Group
            </button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetPrivateInPerson;
