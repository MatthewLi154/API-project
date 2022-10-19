import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SingleEvent.css";
import { fetchAllEvents, fetchSingleEvent } from "../../store/events";

const SingleEvent = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const singleEventObj = useSelector((state) => state.events.singleEvent);

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchSingleEvent(eventId));
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>{singleEventObj.name}</h1>
      </div>
    </>
  );
};

export default SingleEvent;
