import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const errors = [];

    if (credential.length > 50) {
      errors.push("Invalid username or email");
    }

    if (credential.length === 0) {
      errors.push("Please enter a username or email");
    }

    if (password.length === 0) {
      errors.push("Please enter a password");
    }

    if (password.length > 50) {
      errors.push("Invalid password");
    }

    if (errors.length > 0) setErrors(errors);

    return errors;
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length === 0) {
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
  };

  const onDemoUser = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <div className="loginFormContainer">
        <h2>Log In</h2>
        {errors.length > 0 && (
          <ul className="loginErrorList">
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label>Username or Email</label>
            </div>
            <div>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login-demouser-buttons">
            <div>
              <button type="submit">Log In</button>
            </div>
          </div>
        </form>
        <div>
          <button type="submit" onClick={(e) => onDemoUser(e)}>
            Demo User
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
