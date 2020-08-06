import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
// import Nav from "./components/nav/nav"
import Login from "./components/login/login";
import Register from "./components/login/register";
import ResetPassword from "./components/login/resetPassword";
import ForgottenPassword from "./components/login/forgottenPassword";
import EmailSent from "./components/login/emailSent";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import EditProperty from "./pages/editProperty/editProperty";
import PropertyDetails from "./pages/propertyDetails/propertyDetails";
import AddProperty from "./pages/addProperty/addProperty";
import Error from "./pages/error";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    async function isUserAuthenticated() {
      const response = await fetch(
        "http://localhost:9090/api/users/is-authenticated",
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("ok");
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
    isUserAuthenticated();
  }, [isAuth]);
  console.log(isAuth);

  return (
    <BrowserRouter>
      <div className="App" id="root">
        <main>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setIsAuth={setIsAuth} exact />
              )}
            />
            <Route path="/register" component={Register} exact />
            <Route
              path="/changePassword/:token"
              component={ResetPassword}
              exact
            />
            <Route
              path="/forgottenPassword"
              component={ForgottenPassword}
              exact
            />
            <Route path="/emailSent" component={EmailSent} exact />
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
        </main>
      </div>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  console.log(isAuth);
  return (
    // super private route
    <Route
      {...rest}
      render={(props) =>
        // isAuth ?
        //     <Component {...props} />
        // : <Redirect to="/login" />
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
