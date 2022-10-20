import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateEventForm.css";
import { fetchSingleGroup } from "../../store/groups";

const CreateEventForm = () => {
  const dispatch = useDispatch();
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
  const [endDate, setEndDate] = useState("2022-10-19T19:30");

  useEffect(() => {
    dispatch(fetchSingleGroup(groupId));
  }, [dispatch]);

  return (
    <>
      <div className="createEventFormContainer">
        <div>
          <h1>Create an event for your group</h1>
        </div>
        <form>
          <div className="formEventName">
            <div>
              <label>Event Name</label>
            </div>
            <div>
              <input type="text" placeholder="What is your event's name?" />
            </div>
          </div>
          <div className="formEventOnlineInPerson">
            <div>
              <label>Is this event online or in person?</label>
            </div>
            <div>
              <select name="inperson">
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
              <select name="privatepublic">
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
              <input type="text" placeholder="Max amount of people?"></input>
            </div>
          </div>
          <div className="formEventPrice">
            <div>
              <label>Price</label>
            </div>
            <div>
              <input type="text" placeholder="Price"></input>
            </div>
          </div>
          <div className="formEventDescription">
            <div>
              <label>Event Description</label>
            </div>
            <div>
              <textarea></textarea>
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
              ></input>
            </div>
          </div>
          <button className="createEventButton">Create Event</button>
        </form>
      </div>
    </>
  );
};

export default CreateEventForm;
