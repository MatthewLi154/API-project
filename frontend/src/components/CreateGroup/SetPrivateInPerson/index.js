import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SetPrivateInPerson.css";

const SetPrivateInPerson = () => {
  const location = useLocation();
  const newGroupObj = location.state?.newGroupObj;
  const [privateGroup, setPrivateGroup] = useState(false);
  const [inPerson, setInPerson] = useState("In person");
  const [imgurl, setImgurl] = useState("");

  useEffect(() => {
    newGroupObj.groupPrivate = privateGroup;
    newGroupObj.groupInPerson = inPerson;
    newGroupObj.groupImage = imgurl;
    // console.log(newGroupObj);
  }, [privateGroup, inPerson, imgurl]);

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
            <option value={true}>Private</option>
            <option value={false}>Public</option>
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
              Create Group
            </button>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default SetPrivateInPerson;
