import React, { useState } from "react";
import userIcon from "../../user-image.svg";
import { NavLink, useHistory } from "react-router-dom";
import "./style.css";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  // const [error, setError] = useState(null);

  function requestRegister() {
    // setError(null)
    fetch("/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
        repeatPassword,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          history.push("/login");
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log("error when registering");
      });
  }
  return (
    <div className="register-base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={userIcon} alt="user" />
        </div>
        <div className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username (Min. 3 char.)</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name (Min. 1 char.)</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name (Min. 1 char.)</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email (Valid email)</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (Min. 3 char.)</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">
              Repeat Password (Min. 3 char.)
            </label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" onClick={requestRegister} className="btn">
          Register
        </button>
      </div>

      <div className="link-text">
        <div>Have an account?</div>
        <div>
          <NavLink to="/login">Login now!</NavLink>
        </div>
      </div>
    </div>
  );
}
