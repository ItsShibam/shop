import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      role="status"
      animation="border"
      style={{
        width: "100 px",
        height: "100 px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
