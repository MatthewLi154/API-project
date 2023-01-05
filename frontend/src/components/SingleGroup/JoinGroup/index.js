import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
