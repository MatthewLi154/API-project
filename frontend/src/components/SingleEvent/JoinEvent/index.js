import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addNewAttendees,
  deleteAttendee,
  fetchAttendees,
} from "../../../store/attendees";
import "./JoinEvent.css";

const JoinEvent = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const eventDate = props.eventStartDate;
  const title = props.title;
  const price = props.price;
  const eventId = props.eventId;
  const userId = props.userId;
  const attendees = props.attendees;
  const setAttendees = props.setAttendees;
  const groupId = props.groupId;
  const fetchEventAttendees = props.fetchEventAttendees;
  const isMember = props.isMember;

  let isAttending = false;
  for (const attendee in attendees) {
    if (attendees[attendee].id === userId) {
      isAttending = true;
    }
  }

  const onAttend = async (e) => {
    e.preventDefault();
    await dispatch(addNewAttendees(eventId, userId));
    await dispatch(fetchAttendees(eventId));
  };

  const onUnattend = async (e) => {
    e.preventDefault();
    await dispatch(deleteAttendee(eventId, userId));
    await dispatch(fetchAttendees(eventId));
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button
              onClick={(e) => {
                onUnattend(e);
              }}
            >
              Unattend
            </button>
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
            {isMember ? (
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
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={(e) => {
                    history.push(`/groups/${groupId}`);
                  }}
                >
                  Join Group to Attend
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JoinEvent;
