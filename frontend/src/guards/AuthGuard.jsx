import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
}

export default AuthGuard;
