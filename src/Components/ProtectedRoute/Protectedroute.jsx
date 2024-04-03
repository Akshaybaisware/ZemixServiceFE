import React from "react";
import { Route, useNavigate } from "react-router-dom";

const Protectedroute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            navigate("/login")
          )
        }
      />
    </>
  );
};

export default Protectedroute;
