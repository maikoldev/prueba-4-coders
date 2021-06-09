import React from "react";

export const Alert = ({ msg, variant }) => {
  return <div className={`alert alert-${variant}`}>{msg}</div>;
};
