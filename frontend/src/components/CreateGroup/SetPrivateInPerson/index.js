import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetPrivateInPerson.css";
import { createSingleGroup } from "../../../store/groups";

const SetPrivateInPerson = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const newGroupObj = location.state?.newGroupObj;
  const [privateGroup, setPrivateGroup] = useState(
    newGroupObj.groupPrivate || 0
  );
  const [inPerson, setInPerson] = useState(
    newGroupObj.groupInPerson || "In person"
  );
  const [imgurl, setImgurl] = useState("");

  // destructure location from newGroupObj, extract city and state
  const { groupLocation, groupDescription, groupName } = newGroupObj;
  const groupLocationArr = groupLocation.split(", ");
  const [city, state] = groupLocationArr;

  let groupDataObj = {};
  useEffect(() => {
    newGroupObj.groupPrivate = privateGroup;
    newGroupObj.groupInPerson = inPerson;
    newGroupObj.groupImage = imgurl;

    groupDataObj.name = groupName;
    groupDataObj.about = groupDescription;
    groupDataObj.type = newGroupObj.groupInPerson;
    groupDataObj.private = newGroupObj.groupPrivate;
    groupDataObj.city = city;
    groupDataObj.state = state;

    console.log(groupDataObj);
  }, [privateGroup, inPerson, imgurl]);

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
        <div>
          <h3>Is this an in person or online group?</h3>
          <select
            name="inperson"
            value={inPerson}
            onChange={(e) => {
              setInPerson(e.target.value);
            }}
          >
            <option value="">Please choose an option</option>
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
            <option value="">Please choose an option</option>
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
              onClick={() => {
                dispatch(createSingleGroup(groupDataObj));
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
