import React from "react";
import { Link } from "react-router-dom";

export default function Failure() {
  return (
    <div>
      <h1>Failure, Network Error!</h1>
      <Link to="/user">Back To Home</Link>
    </div>
  );
}
