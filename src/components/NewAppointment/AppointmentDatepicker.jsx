import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React from "react";

export function AppointmentDatepicker({ setAppointmentTime, doctor }) {
	function isDateDisabled(date) {
		const dateWeekDayNameShort = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
		})
			.format(date)
			.toLowerCase();

		return !doctor.availability.some(
			(sched) =>
				sched.day_of_the_week === dateWeekDayNameShort &&
				sched.day_start_times.length > 0
		);
	}

	function isTimeDisabled(value, view) {
		if (value.minute() % 15 !== 0) {
			return true;
		}

		const dateWeekDayNameShort = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
		})
			.format(value.$d)
			.toLowerCase();

		const hr = value
			.hour()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 });
		const min = value
			.minute()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 });

		const isSlotAvailableInDoctorScheduleThatDay =
			doctor.availability?.some(
				(sched) =>
					// for the week day of this date
					sched.day_of_the_week === dateWeekDayNameShort &&
					sched.day_start_times.some((startTime) =>
						view === "minutes"
							? // is there some start time equal to this time (for exact minutes)
							  startTime === `${hr}:${min}:00`
							: // for all minutes in this hour
							  startTime === `${hr}:00:00` ||
							  startTime === `${hr}:15:00` ||
							  startTime === `${hr}:30:00` ||
							  startTime === `${hr}:45:00`
					)
			);

		const isSlotConflictingWithExistingAppointment = doctor.calendar.some(
			(appt) =>
				view === "minutes" &&
				new Date(appt.start_time).getTime() ===
					new Date(value.$d).getTime()
		);

		return !(
			// conditions to enable datetime
			(
				isSlotAvailableInDoctorScheduleThatDay &&
				!isSlotConflictingWithExistingAppointment
			)
		);
	}

	return (
		<Box>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={["DateTimePicker"]}>
					<DemoItem>
						<DateTimePicker
							ampm={false}
							label="Appointment Time Picker"
							shouldDisableDate={isDateDisabled}
							shouldDisableTime={isTimeDisabled}
							disablePast
							views={["year", "month", "day", "hours", "minutes"]}
							onChange={(val) => {
								setAppointmentTime(new Date(val));
							}}
						/>
					</DemoItem>
				</DemoContainer>
			</LocalizationProvider>
		</Box>
	);
}
