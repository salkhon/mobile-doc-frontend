import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { AppointmentDatepicker } from "./AppointmentDatepicker";

export function BookingConfirm({ handleBookAppointment }) {
	const [appointmentTime, setAppointmentTime] = useState(null);

	return (
		<Box display="flex" marginTop="10px" justifyContent="center">
			<Box margin="15px">
				<Button
					variant="contained"
					color="secondary"
					onClick={(e) => handleBookAppointment(e, appointmentTime)}
				>
					Book Appointment
				</Button>
			</Box>
			<AppointmentDatepicker setAppointmentTime={setAppointmentTime} />
		</Box>
	);
}
