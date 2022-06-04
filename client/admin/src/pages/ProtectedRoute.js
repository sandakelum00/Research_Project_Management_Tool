import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { admin } = useAppContext();
  if (!admin) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
