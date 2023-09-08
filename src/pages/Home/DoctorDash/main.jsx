import React from "react";
import "./styles.css";
import UpcomingPatient from "./upcomingPatient";
import TopBar from "./topBar";
import { getAppointmentsByDoctorId } from "../../../api/session";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import LoadingBackdrop from "../../../components/Backdrop/LoadingBackdrop";
import PeerReview from "./peerReview";
import Stack from '@mui/material/Stack';
import PendingDiagnosis from "./pendingDiagnosis";


const Main = (name) => {

  const { userId } = useAuth();
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    getAppointmentsByDoctorId(userId).then((appointments) => setAppointments(appointments));
  }, [userId]);


  if (!appointments) {
    return <LoadingBackdrop />;
  }


  const pending_appointments = appointments.filter((appointment) => {
    return appointment.end_time === null || new Date(appointment.start_time) > new Date();
  });


  if (!pending_appointments) {
    return <LoadingBackdrop />;
  }

  //appointments with end_time < current time and empty prescription

  console.log(appointments);

  const pending_diagnosis = appointments.filter((appointment) => {
    return appointment.end_time !== null && new Date(appointment.end_time) < new Date() && appointment.diagnosis === null;
  });


  const peerReview = {
    symptoms: ["cough", "fever", "fatigue", "flash sweats"],
    tests: [["PCR", "negative"], ["antigen", "negative"], ["NS1", "positive"]],
    diagnosis: "Dengue",
    prescribed_medications: ["paracetamol", "panadol", "ibuprofen"],
    notes: ["Hospitalization advised"],
  };

  const peerReviews = [peerReview, peerReview, peerReview];





  return (

    <div>

      <div className="horizontal-container">
        <div className="left-div shadowPadMargin2">
          <h3>Upcoming Appointments</h3>
          <div style={{
            height: "40%",
            overflowY: "scroll",
          }}>

            {pending_appointments.map((appointment) => {
              return (
                <UpcomingPatient
                  appointment={appointment}
                />
              );
            })}

          </div>

          <h3>Peer Review</h3>

          {/* scrollable horizontally */}
          <div style={{
            height: "30%",
            overflowX: "scroll",
          }}>

            <Stack direction="row">
              {peerReviews.map((peerReview) => {
                return (
                  <PeerReview
                    peerReview={peerReview}
                  />
                );
              }
              )}
            </Stack>
          </div>


        </div>
        <div className="right-div shadowPadMargin2" >
          <h3> Pending Prescriptions</h3>
          <div style={{
            height: "60%",
            overflowY: "scroll",
          }}
          >
            {pending_diagnosis.map((appointment) => {
              return (
                <PendingDiagnosis
                  appointment={appointment}
                />
              );
            })}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Main;
