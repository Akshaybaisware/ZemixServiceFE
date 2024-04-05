import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const token = localStorage?.getItem("token");
  const isAuthorized = token ? true : false;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
