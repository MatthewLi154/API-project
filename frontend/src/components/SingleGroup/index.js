import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";

const SingleGroup = () => {
  return (
    <>
      <div>Hello from Single group</div>
    </>
  );
};

export default SingleGroup;
