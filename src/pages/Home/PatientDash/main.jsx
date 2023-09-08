import React from "react";
import "./styles.css";
import DM from "./diseaseMed";
import Details from "./details";
import TopBar from "./topBar";
import {
  getAppointmentsByPatientId,
} from "../../../api/session";
import { useEffect, useState } from "react";
import {
  useAuth
}
  from "../../../hooks/auth";

import LoadingBackdrop from "../../../components/Backdrop/LoadingBackdrop";



const Main = (name) => {

  const { userId } = useAuth();

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    getAppointmentsByPatientId(userId).then((appointments) => setAppointments(appointments));
  }, [userId]);


  if (!appointments) {
    return <LoadingBackdrop />;
  }
  //get names of doctors from appointments. Replace null with "Null"

  const doctorNames = appointments.map((appointment) => {
    if (appointment.doctor_id === null) {
      return "Null";
    }
    else {
      return appointment.doctor_id;
    }
  });




  //get names of symptoms of each appointment. mutiple symptoms per appointment.symptom_list.symptom_name






  return (
    <div>
      <TopBar
        name={name}
      />


      <div className="horizontal-container">
        <div className="left-div shadowPadMargin2">
          <h3>Ongoing Treatment</h3>

          {appointments.map((appointment) => {
            return (
              <DM
                appointment={appointment}
              />
            );
          })}
        </div>

        <div className="right-div shadowPadMargin2">
          <Details />
        </div>
      </div>


    </div>
  );
};

export default Main;
