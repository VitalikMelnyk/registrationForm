import React from "react";
// import { withCookies, useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const tokenIsAuth = rest.cookies.get("token");
  const tokenIsAuth = Cookies.get("AccessToken");

  return tokenIsAuth ? (
    <Route {...rest} render={props => <Component {...props} />} />
  ) : (
    // <Redirect to="/" />
    <Route {...rest} render={props => <Redirect to="/" />} />
  );
};
