import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React from "react";

export function AppointmentDatepicker({ setAppointmentTime }) {
    // todo: only show available datetimes
	return (
		<Box>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={["DateTimePicker"]}>
					<DateTimePicker
						label="Basic date time picker"
						onChange={(val) => setAppointmentTime(new Date(val))}
					/>
				</DemoContainer>
			</LocalizationProvider>
		</Box>
	);
}
