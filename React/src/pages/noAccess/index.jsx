import React, { useContext } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleGoBack}>
          turn back
        </Button>
      }
    />
  );
};

export default NoAccess;
