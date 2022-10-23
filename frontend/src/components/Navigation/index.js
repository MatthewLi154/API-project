import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
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
      <NavLink exact to="/" style={{ textDecoration: "none", color: "red" }}>
        Weeb Up
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
