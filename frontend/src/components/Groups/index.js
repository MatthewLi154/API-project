import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import "./Groups.css";

const Groups = () => {
  const allGroups = useSelector((state) => state.groups.allGroups);
  const dispatch = useDispatch();

  console.log(allGroups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <>
      <div className="groupsContainer">
        {allGroups &&
          allGroups.map((group) => (
            <div className="singleGroupContainer" key={group.id}>
              <div className="groupCard">
                <div className="leftImg">
                  <img src={group.previewImage}></img>
                </div>
                <div className="rightText">
                  <div className="groupTitle">
                    <h2>{group.name}</h2>
                  </div>
                  <div className="groupLocation">
                    <h3>{group.city}</h3>
                  </div>
                  <div className="groupDescription">
                    <p>{group.about}</p>
                  </div>
                  <div className="groupNumMembers">
                    <span>
                      {group.numMembers} members ·{" "}
                      {group.private ? `Private` : `Public`}
                    </span>
                  </div>
                  <div className="status"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Groups;
