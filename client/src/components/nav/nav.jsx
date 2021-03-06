import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./nav.css";

export default function Nav({ isAuth, setIsAuth }) {
  const history = useHistory();
  function logout() {
    fetch(`/api/users/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("Could not log out");
      });
  }
  return (
    <nav className="navigation" data-tut="reactour__home_nav">
      <React.Fragment>
        <div className="nav-container">
          <NavLink
            exact
            to="/"
            className={
              window.location.pathname === "/" ? "nav-link active" : "nav-link"
            }
          >
            HOME
          </NavLink>
          <NavLink
            exact
            to="/addproperty"
            className={
              window.location.pathname === "/addproperty"
                ? "nav-link active"
                : "nav-link"
            }
            datatut="reactour__add_property"
          >
            ADD PROPERTY
          </NavLink>
          <div
            className="logo-container"
            onClick={() => {
              history.push("/");
            }}
          >
            <img
              src="https://react-node-mysql.s3.eu-north-1.amazonaws.com/logo-yournewhome.png"
              alt="logo"
              className="logo"
            />
          </div>
          <NavLink
            exact
            to="/profile"
            className={
              window.location.pathname === "/profile"
                ? "nav-link active"
                : "nav-link"
            }
            datatut="reactour__profile"
          >
            MY PROFILE
          </NavLink>
          <a className="nav-link" onClick={logout}>
            LOGOUT
          </a>
        </div>
      </React.Fragment>
    </nav>
  );
}
