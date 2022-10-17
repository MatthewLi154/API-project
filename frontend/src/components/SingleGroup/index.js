import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleGroup } from "../../store/groups";
import "./SingleGroup.css";

const SingleGroup = () => {
  const { id } = useParams();
  const groupDataObj = useSelector((state) => state.groups.singleGroup);
  // console.log(groupDataObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleGroup(id));
  }, [dispatch]);

  return (
    <>
      {groupDataObj && (
        <div className="pageContainer">
          {/* <div>{groupDataObj.name}</div> */}
          <div className="upperSectionDetails">
            <div className="leftImgContainer">
              <img src={groupDataObj.GroupImages[0]?.url}></img>
            </div>
            <div className="rightSectionDetails">
              <div className="groupName">
                <h1>{groupDataObj.name}</h1>
              </div>
              <div className="groupDetailContainer">
                <div className="groupLocation">
                  <h3>
                    {groupDataObj.city}, {groupDataObj.state}
                  </h3>
                </div>
                <div className="groupNumMembersPrivate">
                  <h3>
                    {groupDataObj.numMembers} members ·{" "}
                    {groupDataObj.private ? `Private Group` : `Public Group`}
                  </h3>
                </div>
                <div className="groupOrganizer">
                  <h3>
                    Organized by {groupDataObj.Organizer.firstName}{" "}
                    {groupDataObj.Organizer.lastName}
                  </h3>
                </div>
                <div className="groupShare"></div>
              </div>
            </div>
          </div>
          <div className="middleSectionContainer">
            <div className="middleSectionLeftSide">
              <div>
                <h2>What we're about</h2>
              </div>
              <div>
                <p>{groupDataObj.about}</p>
              </div>
            </div>
            <div className="middleSectionRightSide">
              <h2>Organizers</h2>
              <h3>
                {groupDataObj.Organizer.firstName}{" "}
                {groupDataObj.Organizer.lastName}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGroup;
