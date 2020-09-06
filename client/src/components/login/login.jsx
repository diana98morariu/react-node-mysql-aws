import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import userIcon from "../../user-image.svg";
import "./style.css";
import toastr from "toastr";
import "./../../toastr.css";

export default function Login({ setIsAuth }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function requestLogin() {
    fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAuth(true);
          toastr.success("Logged in successfully!");
          history.push("/");
        } else {
          throw res;
        }
      })
      .catch((err) => {
        toastr.warning("The username or password do not match");
      });
  }

  return (
    <div className="login-base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={userIcon} alt="user" />
        </div>
        <form className="login-form">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="footer">
        <button type="button" onClick={() => requestLogin()} className="btn">
          Login
        </button>
      </div>
      <a onClick={() => history.push("/register")}>
        Don't have an account? Register now!
      </a>
    </div>
  );
}
