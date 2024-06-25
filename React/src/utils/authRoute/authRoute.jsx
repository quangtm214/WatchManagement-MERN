// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import AuthContext from "../../service/authAPI/authProvideAPI";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, isAdmin }) => {
  const [thisUser, setThisUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("thisUser", thisUser);
  }, [thisUser]);
  useEffect(() => {
    console.log("user", user);
    if (user) {
      setThisUser(user);
      setIsLoading(false);
    }
    if (user === null) {
      setThisUser(null);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("user28", user);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (thisUser) {
    // eslint-disable-next-line react/prop-types
    if (isAdmin === true) {
      if (thisUser.isAdmin === false) {
        return <Navigate to="/no-access" />;
      }
      return children;
    }
    if (thisUser === null) {
      // eslint-disable-next-line react/prop-types
      if (thisUser.isAdmin === true) {
        return children;
      } else {
        return <Navigate to="/no-access" />;
      }
    }
    return children;
  }
};

export default ProtectedRoute;
