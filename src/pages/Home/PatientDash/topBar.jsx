import React from "react";
import "./styles.css";



const topBar = ( name ) => {

  return (
    <div
      className="shadowPadMargin2"
      style={{
        paddingLeft: "2%",
      }}
    >
      <h4>Welcome</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>
        {name.name.name}
      </h2>
      <div>Notification</div>
      </div>
    </div>
  );
};

export default topBar;
