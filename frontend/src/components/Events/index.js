import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents } from "../../store/events";

const Events = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <>
      <h1>Hello from events</h1>
    </>
  );
};

export default Events;
