import React, { useState } from "react";
import userIcon from "../../user-image.svg";
import { NavLink, useHistory } from "react-router-dom";
import "./style.css";
import toastr from "toastr";
import "./../../toastr.css";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const valid = emailRegexp.test(email);

  function requestRegister() {
    if (username.length < 3 || username.length > 25) {
      return toastr.warning("Username must be between 3-25 characters");
    }
    if (firstName.length < 1 || firstName.length > 255) {
      return toastr.warning("First name must be between 1-255 characters");
    }
    if (lastName.length < 1 || lastName.length > 255) {
      return toastr.warning("Last name must be between 1-255 characters");
    }
    if (!valid) {
      return toastr.warning("Invalid email");
    }
    if (password.length < 3 || password.length > 60) {
      return toastr.warning("Password must be between 3-60 characters");
    }
    if (password !== repeatPassword) {
      return toastr.warning("Repeat password does not match the password");
    }

    fetch("/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
        email,
        password,
        repeatPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toastr.success("User created successfully!");
          history.push("/login");
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log(err);
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
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
