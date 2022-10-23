// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    console.log(firstName);
    if (password === confirmPassword) {
      console.log("true");
    } else {
      console.log("false");
    }
  }, [firstName, password, confirmPassword]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors.length === 0) {
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        // if (data && data.errors) setErrors(data.errors);
        const errors = [];
        if (data && data.errors) {
          errors.push("Username or email already exists");
          setErrors(errors);
          return errors;
        }
      });
    }

    // return setErrors([
    //   "Confirm Password field must be the same as the Password field",
    // ]);
  };

  const validate = () => {
    const errors = [];

    if (firstName.length > 50) {
      errors.push("First name must be less than 50 characters");
    }

    if (firstName.length === 0) {
      errors.push("Please enter a first name");
    }

    if (lastName.length > 50) {
      errors.push("Last name must be less than 50 characters");
    }

    if (lastName.length === 0) {
      errors.push("Please enter a last name");
    }

    if (password.length === 0) {
      errors.push("Please enter a password");
    }

    if (password !== confirmPassword) {
      console.log("passwords dont match");
      errors.push("Passwords don't match");
    }

    if (confirmPassword.length === 0) {
      errors.push("Please confirm your password");
    }

    if (password.length > 20 || password.length < 6) {
      errors.push("Password must be between 6 and 20 characters");
    }

    if (username.length === 0) {
      errors.push("Please enter a username");
    } else if (username.length < 4 || username.length > 30) {
      errors.push("Username must be between 4 and 30 characters");
    }

    if (email.length === 0) {
      errors.push("Please enter an email address");
    } else if (email.length < 3 || email.length > 256) {
      errors.push("Email must be between 3 and 255 characters");
    } else {
      if (!email.includes("@")) {
        errors.push("Please enter a valid email");
      }
      if (!email.includes(".")) {
        errors.push("Please enter a valid email");
      } else if (email.includes(".")) {
        let emailArr = email.split(".");
        if (emailArr[1].length < 3) {
          errors.push("Please enter a valid email");
        }
      }
    }

    if (errors.length > 0) setErrors(errors);

    return errors;
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="signupform">
            <div className="formTitle">
              <h2>Finish signing up</h2>
            </div>
            {errors.length > 0 && (
              <ul className="errorListSignUp">
                {errors.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            )}
            <div className="inputField">
              <div>
                <label className="yourNameText">First Name</label>
              </div>
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label className="yourNameText">Last Name</label>
              </div>
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
              </div>
              {/* <div className="tinyTextUnderYourName">
                <span>
                  Your name will be public on your Meetup profile.
                </span>
              </div> */}
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
              <button
                className="signupButtonForm"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up
              </button>
            </div>
            {/* <div>
              <span className="alreadyMember">
                Already a member?
                <span>
                  {" "}
                  <LoginFormModal />
                </span>
              </span>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupFormPage;
