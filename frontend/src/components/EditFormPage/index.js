import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./EditFormPage.css";
import {
  fetchSingleGroup,
  fetchGroups,
  fetchEditGroup,
} from "../../store/groups";

const EditFormPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("In Person");
  const [privateGroup, setPrivateGroup] = useState(1);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleGroup(groupId));
    // dispatch(fetchGroups());
  }, [dispatch]);

  const validate = () => {
    const errors = [];

    // name validations
    if (name.length === 0) {
      errors.push("Please enter your group name.");
    } else if (name.length > 50) {
      errors.push("Group name is too long. Please use 50 characters or less");
    }

    // group validations
    const regex = /[A-Za-z]+[ ]?[A-Za-z]+,[ ]?[A-Z]{2}$/;

    if (!regex.test(location)) {
      errorMessages.push("Please use valid City, State (e.g. New York, NY)");
    }

    // description validations
    if (description.length < 30) {
      errors.push("Please write at least 30 characters.");
    }

    // type validations

    // private validations

    // return errors
    if (errors.length > 0) setErrorMessages(errors);

    return errors;
  };

  const onSubmit = async (e) => {
    const errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrorMessages(errors);
    }

    // get city and state from location
    let cityState = location.split(", ");
    let [city, state] = cityState;

    let formData = {
      name: name,
      about: description,
      type: type,
      private: privateGroup,
      city: city,
      state: state,
    };

    await dispatch(fetchEditGroup(groupId, formData));
    // await dispatch(fetchSingleGroup(groupId));
    // await dispatch(fetchGroups());
  };

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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="editGroupLocation">
              <label>Location</label>
            </div>
            <div className="editGroupLocationInput">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></input>
            </div>
            <div className="editGroupDescription">
              <label>About</label>
            </div>
            <div className="editGroupDescriptionTextArea">
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <div>
                <label>Is this an in person or online group?</label>
              </div>
              <select name="inperson">
                {/* <option value="">Please choose an option</option> */}
                <option
                  value="In Person"
                  onChange={(e) => setType(e.target.value)}
                >
                  In Person
                </option>
                <option
                  value="Online"
                  onChange={(e) => setType(e.target.value)}
                >
                  Online
                </option>
              </select>
            </div>
            <div>
              <div>
                <label>Is this group private or public?</label>
              </div>
              <select
                name="type"
                value={privateGroup}
                onChange={(e) => setPrivateGroup(e.target.value)}
              >
                {/* <option value="">Please choose an option</option> */}
                <option value={1}>Private</option>
                <option value={0}>Public</option>
              </select>
            </div>
            <div className="editFormSubmitButton">
              <NavLink to={`/groups/${groupId}`}>
                {" "}
                <button
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Submit
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFormPage;
