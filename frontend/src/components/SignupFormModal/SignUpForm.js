// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="signupform">
            <div className="formTitle">
              <h2>Finish signing up</h2>
            </div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="inputField">
              <div>
                <label className="yourNameText">Your name</label>
              </div>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </div>
              <div className="tinyTextUnderYourName">
                <span>
                  {/*if input is empty, show "name is required in red, if input is not empty, show "Your name will be public on your Meetup profile*/}
                  Your name will be public on your Meetup profile.
                </span>

                {/* {name.length === 0 && (
              <span className="nameIsRequired">Name is required</span>
            )} */}
              </div>
              <div className="emailContainer">
                <div>
                  <label>Email</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="usernameContainer">
                <div>
                  <label>Username</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="passwordContainer">
                <div>
                  <label>Password</label>
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="confirmPasswordContainer">
                <div>
                  <label>Confirm Password</label>
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="signupButtonForm" type="submit">
                Sign Up
              </button>
            </div>
            <div>
              <span className="alreadyMember">
                Already a member?
                <span>
                  {" "}
                  <LoginFormModal />
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupFormPage;
