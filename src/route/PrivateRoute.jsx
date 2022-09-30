import React from "react";
import { Route, Redirect } from "react-router-dom";

const Privateroute = ({ children, ...rest }) => {
  return (
    <Route {...rest}>
      {localStorage.getItem("access_token") ? (
        children
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default Privateroute;
