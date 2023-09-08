import React from "react";
import HorizontalBar from "./hBar";
import { Chip, Box, Card, Stack, Typography } from "@mui/material";
// import Typography from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function formatDate(dateObject) {
  const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = new Date(dateObject).toLocaleDateString('en-US', options);
  return formattedDate;
}


const AppointmentBox = ({
  appointment
}) => {
  /*
    Object
    session_id
    patient_id
    doctor_id
    end_time
    start_time
  */

  const symptom_list = appointment.symptom_list.map((symptom) => {
    return symptom.symptom_name;
  });


  return (
    <Card style={{
      padding: "2%",
      margin: "2%",
      paddingTop: "0.5%",
      backgroundColor: "rgba(30, 30, 30, 0.5)",
      backdropFilter: "blur(10px)",
    }}>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} > <h3>{appointment.patient_name}</h3></Box>
        <Box>
          <Chip label="First Time" color="primary" />
        </Box>
      </Box>


      <Box display="flex" alignItems="center">
        <Box flexGrow={1} >
          <Stack direction="row" spacing={1}>
            {/* Chip containing ID:patient_id */}
            <Chip label={`ID: ${appointment.patient_id}`} />

            {/* {symptom list as chips} */}
            {symptom_list.map((symptom) => {
              return (
                <Chip label={symptom} color="warning" />
              );
            })}

          </Stack>
        </Box>
        {appointment.start_time && (


          <Chip label={formatDate(new Date(appointment.start_time))} icon={<AccessTimeIcon />} />
        )}

        {!appointment.start_time && (

          <Chip label="Not Set" icon={<AccessTimeIcon />} />

        )}
      </Box>
    </Card>
  );
};

export default AppointmentBox;
