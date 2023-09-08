import React from "react";
import HorizontalBar from "./hBar";
import { Chip, Box, Card, Stack, Typography } from "@mui/material";
// import Typography from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


function timeSinceDate(dateObject) {
  //return current time - dateObject in days rounded down
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - dateObject.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
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
        <Box flexGrow={1} >{appointment.patient_name}</Box>

        {appointment.end_time && (
          <Chip label={timeSinceDate(new Date(appointment.end_time))} icon={<AccessTimeIcon />} />
        )}

        {!appointment.end_time && (
          <Chip label="Not Set" icon={<AccessTimeIcon />} />
        )}
      </Box>
    </Card>
  );
};

export default AppointmentBox;
