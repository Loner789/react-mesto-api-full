// IMPORTS:
import React from "react";
import { Redirect } from "react-router-dom";

// PROTECTED-ROUTE COMPONENT:
function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Redirect to="./sign-in" />;
}

export default ProtectedRoute;
