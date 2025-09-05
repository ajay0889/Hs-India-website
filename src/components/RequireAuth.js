import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }) {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!token) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
}

export default RequireAuth;


