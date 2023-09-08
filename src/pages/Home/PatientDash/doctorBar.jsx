import React from "react";

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


      </div>

      <div className="right-div shadowPadMargin2">
        <Details />
      </div>
    </div>
  );
};

export default doctorBar;
