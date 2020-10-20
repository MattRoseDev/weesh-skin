import React from "react";
import helpers from "Root/helpers";
import client from "Root/apollo";
import { AuthContext } from "Root/contexts/auth";
import { Redirect } from "react-router-dom";

const { storage } = helpers;
export default () => {
  const { auth, dispatch } = React.useContext(AuthContext);
  Object.keys(auth).map(item => {
    storage.remove(item);
  });
  client.cache.reset();
  dispatch({ type: "LOGOUT" });

  return <Redirect to="/login" />;
};
