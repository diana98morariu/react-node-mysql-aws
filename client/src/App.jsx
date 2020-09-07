import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import EditProperty from "./pages/editProperty/editProperty";
import PropertyDetails from "./pages/propertyDetails/propertyDetails";
import AddProperty from "./pages/addProperty/addProperty";
import TutorialTour from "./components/tour/Tour";
import Error from "./pages/error";
import toastr from "toastr";
import toastrSetup from "./toastrSettings";

export default function App() {
  toastr.options = toastrSetup;
  const [isAuth, setIsAuth] = useState(true);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const handleOpenTour = () => {
    setIsTourOpen(true);
  };

  useEffect(() => {
    async function isUserAuthenticated() {
      await fetch("/api/users/is-authenticated", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            setIsAuth(false);
            throw new Error(res.statusText);
          }
          setIsAuth(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    isUserAuthenticated();
  }, [isAuth]);

  return (
    <BrowserRouter>
      <div className="App" id="root">
        <main>
          <button
            onClick={handleOpenTour}
            style={{
              border: "none",
              backgroundColor: "#f99746",
              color: "white",
              padding: "0.7em 1em",
              borderRadius: "5px",
              position: "fixed",
              right: "1em",
              bottom: "1em",
              cursor: "pointer",
            }}
          >
            Tutorial
          </button>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setIsAuth={setIsAuth} exact />
              )}
            />
            <Route path="/register" component={Register} exact />
            <PrivateRoute path="/" component={Home} isAuth={isAuth} exact />
            <PrivateRoute
              path="/profile"
              component={Profile}
              isAuth={isAuth}
              exact
            />
            <PrivateRoute
              path="/editproperty/:id"
              component={EditProperty}
              isAuth={isAuth}
              exact
            />
            <PrivateRoute
              path="/propertydetails/:id"
              component={PropertyDetails}
              isAuth={isAuth}
              exact
            />
            <PrivateRoute
              path="/addproperty"
              component={AddProperty}
              isAuth={isAuth}
              exact
            />
            <Route component={Error} />
          </Switch>

          <TutorialTour isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />
        </main>
      </div>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
