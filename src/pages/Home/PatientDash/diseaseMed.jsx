import React from "react";
import HorizontalBar from "./hBar";


const AppointmentBox = ({
  appointment
}) => {

  const symptom_names = appointment.symptom_list.map((symptom) => {
    return symptom.symptom_name;
  });

  const durations = appointment.symptom_list.map((symptom) => {
    return symptom.duration;
  });

  const added_by = appointment.symptom_list.map((symptom) => {
    return symptom.added_by;
  }); 

  const n = symptom_names.length;
  const boxes = [];


  var doctor_id = appointment.doctor_id;

  if (doctor_id === null) {
    doctor_id = "Null";
  }
  

  for (let i = 0; i < n; i++) {
    boxes.push(
      <HorizontalBar
        text1={symptom_names[i]}
        text2={durations[i]}
        text3={added_by[i]}
      />
    );
  }

  return (
    <div style={{ padding: "2%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{doctor_id}</h4>
      </div>
      {boxes}
    </div>
  );
};

export default AppointmentBox;
