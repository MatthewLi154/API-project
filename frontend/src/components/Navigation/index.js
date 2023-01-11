import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const loggedIn = () => {
    if (sessionUser === null) {
      return false;
    } else {
      return true;
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <div
          style={{
            position: "absolute",
            right: "8rem",
            fontFamily: "arial",
            top: "1.7rem",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            return history.push("/groups/create");
          }}
        >
          Start a group
        </div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="loginSignupContainer">
          <div className="loginButton">
            <LoginFormModal className="LoginButtonText" />
          </div>
          <div className="signupButton">
            <SignUpFormModal className="SignUpButtonText"></SignUpFormModal>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="navDivContainer">
      <NavLink
        exact
        to={loggedIn ? `/events` : `/`}
        style={{ textDecoration: "none", color: "red" }}
      >
        Weeb Up
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
