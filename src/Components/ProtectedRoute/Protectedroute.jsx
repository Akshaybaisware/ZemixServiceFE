import { useEffect } from "react";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;

  const navigate = useNavigate();
  const isAuthorized = localStorage?.getItem("token") ? true : false;

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
