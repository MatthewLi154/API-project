import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateEventForm.css";
import { fetchSingleGroup } from "../../store/groups";
import {
  addImageToEvent,
  createSingleEvent,
  fetchAllEvents,
} from "../../store/events";

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { groupId } = useParams();
  const [eventName, setEventName] = useState("Adopt-a-Street Clean Up");
  const [eventInPerson, setEventInPerson] = useState("In person");
  const [eventPrivate, setEventPrivate] = useState(1);
  const [eventCapacity, setEventCapacity] = useState(10);
  const [eventPrice, setEventPrice] = useState(5);
  const [eventDescription, setEventDescription] = useState(
    "Example event description"
  );
  const [startDate, setStartDate] = useState("2022-10-19T19:30");
  const [endDate, setEndDate] = useState("2022-10-19T20:30");
  const [eventImg, setEventImg] = useState(
    "https://m.media-amazon.com/images/I/6116uH18WSL._AC_.jpg"
  );
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleGroup(groupId));
  }, [dispatch]);

  const validate = () => {
    const errors = [];

    // name validations
    if (eventName.length === 0) errors.push("Please enter an event name.");
    if (eventName.length > 50)
      errors.push("Name must be 50 characters or less");

    // capactiy validations
    if (!Number.isInteger(parseInt(eventCapacity)))
      errors.push("Capacity must be a valid number");
    else if (parseInt(eventCapacity) < 0)
      errors.push("Capacity can not be a negative number");

    // price validations
    let reg = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    if (!reg.test(eventPrice)) {
      errors.push(
        "Price is not valid. Please use integer or float with 2 decimal places."
      );
    }

    // description balidations
    if (eventDescription.length > 255) {
      errors.push("Description must be less than 255 characters");
    }

    if (!eventDescription.length) {
      errors.push("Please add a description for your event");
    }

    if (!eventImg) {
      errors.push("Please add in an image");
    } else if (!eventImg.endsWith(".jpg")) {
      if (!eventImg.endsWith(".png")) {
        errors.push("Image does not end with jpg or png");
      }
    }

    // date validations
    let initialStartDate = new Date(startDate);
    let initialEndDate = new Date(endDate);
    if (initialEndDate.getTime() < initialStartDate.getTime()) {
      errors.push("End date can not be before start date");
    } else if (initialEndDate.getTime() === initialStartDate.getTime()) {
      errors.push("Start date and end date can not be the same");
    }

    setErrorMessages(errors);
    return errors;
  };

  const onCreateEvent = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) return setErrorMessages(errors);

    // create form data
    let formData = {
      name: eventName,
      about: eventDescription,
      type: eventInPerson,
      private: eventPrivate,
      startDate: startDate,
      endDate: endDate,
    };

    // use thunk to create a new venue for a group by id

    // use thunk to create event
    const createdEvent = await dispatch(createSingleEvent(formData, groupId));

    // use thunk to add an image to an event
    let imageBody = {
      url: eventImg,
      preview: true,
    };
    await dispatch(addImageToEvent(createdEvent.id, imageBody));

    // dispatch fetchEvents to update state for all events
    dispatch(fetchAllEvents());

    // history push to all events page
    history.push("/events");
  };

  return (
    <>
      <div className="createEventFormContainer">
        <div>
          <h1>Create an event for your group</h1>
        </div>
        {errorMessages.length > 0 && (
          <div className="createEventErrorList">
            <ul>
              {errorMessages.map((error) => (
                <li key={error} style={{ color: "red", fontWeight: "bold" }}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form>
          <div className="formEventName">
            <div>
              <label>Event Name</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="What is your event's name?"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
          </div>
          <div className="formEventOnlineInPerson">
            <div>
              <label>Is this event online or in person?</label>
            </div>
            <div>
              <select
                name="inperson"
                value={eventInPerson}
                onChange={(e) => setEventInPerson(e.target.value)}
              >
                <option value="In person">In Person</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>
          <div className="formEventPrivatePublic">
            <div>
              <label>Is the event private or public?</label>
            </div>
            <div>
              <select
                name="privatepublic"
                value={eventPrivate}
                onChange={(e) => setEventPrivate(e.target.value)}
              >
                <option value={0}>Private</option>
                <option value={1}>In person</option>
              </select>
            </div>
          </div>
          <div className="formEventCapacity">
            <div>
              <label>Capacity</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Max amount of people?"
                value={eventCapacity}
                onChange={(e) => setEventCapacity(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="formEventPrice">
            <div>
              <label>Price</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Price"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="formEventDescription">
            <div>
              <label>Event Description</label>
            </div>
            <div>
              <textarea
                name="description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="formEventDateAndTime">
            {/* <div>
              <label>When is the event?</label>
            </div> */}
            <div>
              <div>
                <label>Start date</label>
              </div>
              <div className="dateTimePicker">
                <input
                  type="datetime-local"
                  name="meeting-time"
                  min="2022-10-19T19:30"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label>End date</label>
              </div>
              <div className="dateTimePicker">
                <input
                  type="datetime-local"
                  name="meeting-time"
                  min="2022-10-19T19:30"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Please add an image url</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Please add an image url ending with .jpg or .png"
                value={eventImg}
                onChange={(e) => setEventImg(e.target.value)}
              ></input>
            </div>
          </div>
          <button
            className="createEventButton"
            onClick={(e) => {
              onCreateEvent(e);
            }}
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEventForm;
