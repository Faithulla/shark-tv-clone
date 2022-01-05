import React from "react";
import "./load.css";
import { PropagateLoader } from "react-spinners";
const Loadscreen = () => {
  return (
    <div className="load-container">
      <div className="logo">
        <h1 >Shark-TV</h1>
      </div>
      <div className="loader">
        <PropagateLoader speedMultiplier={1} size={20} color="red" />
      </div>
    </div>
  );
};

export default Loadscreen;
