import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewAttendees, fetchAttendees } from "../../../store/attendees";
import "./JoinEvent.css";

const JoinEvent = ({ props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAttendees(eventId);
  }, [dispatch]);

  const eventDate = props.eventStartDate;
  const title = props.title;
  const price = props.price;
  const eventId = props.eventId;
  const userId = props.userId;
  const attendees = props.attendees;

  let isAttending = false;
  for (const attendee in attendees) {
    if (attendees[attendee].id === userId) {
      isAttending = true;
    }
  }

  const onAttend = async (e) => {
    e.preventDefault();
    await dispatch(addNewAttendees(eventId, userId));
  };

  const attending = (
    <div className="footer-main-container">
      <div className="footer-inner-container">
        <div>
          <div style={{ fontWeight: "600" }}>{eventDate}</div>
          <div>{title}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "0rem 1rem",
              fontSize: "16px",
              border: "1px solid black",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
            }}
          >
            Attending
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isAttending ? (
        attending
      ) : (
        <div className="footer-main-container">
          <div className="footer-inner-container">
            <div>
              <div style={{ fontWeight: "600" }}>{eventDate}</div>
              <div>{title}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "0rem 1rem", fontSize: "16px" }}>
                ${price}
              </div>
              <button
                onClick={(e) => {
                  onAttend(e);
                }}
              >
                Attend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinEvent;
