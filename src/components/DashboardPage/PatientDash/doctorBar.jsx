import React from "react";
import Popup from "reactjs-popup";


const doctorBar = ({
  doctorFirstName,
  doctorLastName,
  doctorSpeciality,
  doctorLocation,
  doctorTime,
}) => {
  return (
    <div>
      <div
        className="shadowPadMargin1"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4>
          {doctorFirstName} {doctorLastName}
        </h4>
        <div>{doctorSpeciality}</div>
        <div>{doctorLocation}</div>
        <div>{doctorTime}</div>

        <button type="button" className="btn btn-info">
              Book an Appointment
            </button>
        {/* <Popup
          trigger={
            
          }
          position="center center"
        >
          <div className="modal">GeeksforGeeks</div>
          <button>Click here</button>
        </Popup> */}
        
      </div>
    </div>
  );
};

export default doctorBar;
