import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EditFormPage.css";
import {
  fetchSingleGroup,
  fetchGroups,
  fetchEditGroup,
} from "../../store/groups";

const EditFormPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(
    localStorage.getItem("groupEditName") || "Cow Farmers"
  );
  const [location, setLocation] = useState(
    localStorage.getItem("groupEditLocation") || "Farm City, NY"
  );
  const [description, setDescription] = useState(
    localStorage.getItem("groupEditDescription") ||
      "In this world, there are a lot of cows, and we need those cows. This group is about farmers who do all things cows! Join and learn more."
  );
  const [type, setType] = useState(
    localStorage.getItem("groupEditType"),
    "In person"
  );
  const [privateGroup, setPrivateGroup] = useState(
    localStorage.getItem("groupEditPrivateGroup"),
    1
  );
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleGroup(groupId));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("groupEditName", name);
    localStorage.setItem("groupEditLocation", location);
    localStorage.setItem("groupEditDescription", description);
    localStorage.setItem("groupEditType", type);
    localStorage.setItem("groupEditPrivateGroup", privateGroup);
  }, [name, location, description, type, privateGroup]);

  const validate = () => {
    const errorMessages = [];

    // name validations
    if (name.length === 0) {
      errorMessages.push("Please enter your group name.");
    } else if (name.length > 60) {
      errorMessages.push(
        "Group name is too long. Please use 60 characters or less"
      );
    }

    // location validations
    const regexp = /[A-Za-z]+[ ]?[A-Za-z]+,[ ]?[A-Z]{2}$/;

    if (regexp.test(location) === false) {
      errorMessages.push("Please use valid City, State (e.g. New York, NY)");
    }

    // description validations
    if (description.length > 255) {
      errorMessages.push(
        "Keep the description short and simple. Please use less than 255 characters"
      );
    } else if (description.length === 0) {
      errorMessages.push("Please enter a description");
    }

    // return errors
    if (errorMessages.length > 0) setErrorMessages(errorMessages);

    return errorMessages;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
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
    await dispatch(fetchSingleGroup(groupId));
    await dispatch(fetchGroups());

    history.push(`/groups/${groupId}`);
  };

  return (
    <>
      <div className="pageContainerEditForm">
        <div className="editPageTitle">
          <h1>Edit Your Group's Details</h1>
        </div>
        <ul className="editGroupErrors">
          {errorMessages.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
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
                  value="In person"
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
              {/* <NavLink to={`/groups/${groupId}`}> */}
              <button
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Submit
              </button>
              {/* </NavLink> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFormPage;
