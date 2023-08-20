import { useState } from "react";
import "./styles.css";



const topBar = ({ firstName, lastName,notifications,iNeedADoctorButton }) => {
  firstName = "Sameen";
  lastName = "Shahgir";

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
        {firstName} {lastName}
      </h2>
      <div>Notification</div>
      </div>
    </div>
  );
};

export default topBar;
