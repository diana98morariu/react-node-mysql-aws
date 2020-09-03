import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import userIcon from "../../user-image.svg";
import "./style.css";

export default function Login({ setIsAuth }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

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
          console.log(res);
          setIsAuth(true);
          history.push("/");
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log("error when logging in");
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
      <a onClick={() => history.push("/forgottenPassword")}>
        Forgot you password? Reset it now!
      </a>
    </div>
  );
}
