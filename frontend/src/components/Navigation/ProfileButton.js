import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="profileButtonContainer">
        <div className="profile-user-image" onClick={openMenu}>
          <button>
            <i className="fa-solid fa-user"></i>
          </button>
          <div>
            {showMenu ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </div>
        </div>
        {showMenu && (
          <div className="profile-dropdown-container">
            <div className="profile-dropdown">
              {/* <div>{user.username}</div>
              <div>{user.email}</div> */}
              <div className="userName">Welcome, {user.firstName}</div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/groups");
                }}
              >
                View groups
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/events");
                }}
              >
                View events
              </div>
              <div className="log-out-container">
                <span onClick={logout}>Log Out</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
