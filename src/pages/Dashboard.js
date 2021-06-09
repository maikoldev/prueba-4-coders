import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Hola, {user.name}</h1>
        </div>
      </div>
    </div>
  );
};
