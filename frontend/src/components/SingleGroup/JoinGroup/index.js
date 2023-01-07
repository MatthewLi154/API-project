import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAttendee } from "../../../store/attendees";
import { csrfFetch } from "../../../store/csrf";
import {
  requestMembership,
  fetchMembers,
  deleteMembership,
} from "../../../store/groups";
import "./JoinGroup.css";

const JoinGroup = ({ props }) => {
  const isOrganizer = props.isOrganizer;
  const groupId = props.id;
  const userId = props.userId;
  const members = props.membersArr;
  const reqMembershipObj = { userId: props.userId, groupId: props.id };
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.allEvents);
  // console.log(events);

  useEffect(() => {
    dispatch(fetchMembers(groupId));
  }, [dispatch]);

  const onRequest = async (e) => {
    e.preventDefault();
    await dispatch(requestMembership(groupId, userId));
    await dispatch(fetchMembers(groupId));
  };

  const onLeave = async (e) => {
    e.preventDefault();
    await dispatch(deleteMembership(groupId, userId));

    for (const event in events) {
      // console.log(events[event].groupId);
      if (events[event].groupId == groupId) {
        await dispatch(deleteAttendee(event, userId));
        // console.log(events[event].groupId);
      }
    }
    await dispatch(fetchMembers(groupId));
  };

  let isMember = false;
  for (const member in members) {
    if (members[member].id === userId) {
      isMember = true;
    }
  }

  return (
    <>
      {!isMember ? (
        <div className="join-group-main-container">
          <button
            onClick={(e) => {
              onRequest(e);
            }}
          >
            Join Group
          </button>
        </div>
      ) : (
        <div className="join-group-main-container">
          <button
            onClick={(e) => {
              onLeave(e);
            }}
          >
            Leave Group
          </button>
        </div>
      )}
    </>
  );
};

export default JoinGroup;
