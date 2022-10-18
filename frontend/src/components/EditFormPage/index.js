import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./EditFormPage.css";
import { fetchSingleGroup, fetchGroups } from "../../store/groups";

const EditFormPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleGroup(groupId));
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <>
      <div className="pageContainerEditForm">
        <div className="editPageTitle">
          <h1>Edit Your Group's Details</h1>
        </div>
        <div className="editFormContainer">
          <form>
            <div className="editGroupName">
              <label>Group Name</label>
            </div>
            <div className="editGroupNameInput">
              <input type="text"></input>
            </div>
            <div className="editGroupLocation">
              <label>Location</label>
            </div>
            <div className="editGroupLocationInput">
              <input type="text"></input>
            </div>
            <div className="editGroupDescription">
              <label>About</label>
            </div>
            <div className="editGroupDescriptionTextArea">
              <textarea type="text"></textarea>
            </div>
            <div>
              <div>
                <label>Is this an in person or online group?</label>
              </div>
              <select name="inperson">
                {/* <option value="">Please choose an option</option> */}
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div>
              <div>
                <label>Is this group private or public?</label>
              </div>
              <select name="inperson">
                {/* <option value="">Please choose an option</option> */}
                <option value={1}>Private</option>
                <option value={0}>Public</option>
              </select>
            </div>
            <div className="editFormSubmitButton">
              <NavLink to={`/groups/${groupId}`}>
                {" "}
                <button>Submit</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFormPage;
