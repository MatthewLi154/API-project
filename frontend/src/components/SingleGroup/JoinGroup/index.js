import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../../store/csrf";
import { requestMembership, fetchMembers } from "../../../store/groups";
import "./JoinGroup.css";

const JoinGroup = ({ props }) => {
  const isOrganizer = props.isOrganizer;
  const groupId = props.id;
  const userId = props.userId;
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

  return (
    <>
      <div className="join-group-main-container">
        <button
          onClick={(e) => {
            onRequest(e);
          }}
        >
          Join Group
        </button>
      </div>
    </>
  );
};

export default JoinGroup;
