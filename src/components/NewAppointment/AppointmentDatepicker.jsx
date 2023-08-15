import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React from "react";

export function AppointmentDatepicker({ setAppointmentTime, doctor }) {
	console.log("datepicker got doctor", doctor);

	function isDateDisabled(date) {
		const dateWeekDayNameShort = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
		})
			.format(date)
			.toLowerCase();

		return !doctor.availability.some(
			(sched) => sched.day_of_the_week === dateWeekDayNameShort
		);
	}

	// todo: ultimately doctor will have a list of slots as his availability
	function isTimeDisabled(value, view) {
		if (value.minute() % 15 !== 0) {
			return true;
		}

		const dateWeekDayNameShort = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
		})
			.format(value.$d)
			.toLowerCase();

		const doctorScheduleThatDay = doctor.availability?.find(
			(sched) => sched.day_of_the_week === dateWeekDayNameShort
		);

		const hr = value
			.hour()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 });
		const min = value
			.minute()
			.toLocaleString("en-US", { minimumIntegerDigits: 2 });
		let timeString = `${hr}:${min}:00`;

		const isSlotConflictingWithExistingAppointment = doctor.calendar.some(
			(appt) =>
				view === "minutes" &&
				new Date(appt.session_starttime).getTime() ===
					new Date(value.$d).getTime()
		);

		return !(
			// conditions to enable datetime
			(
				doctorScheduleThatDay &&
				isTimeInRange(
					timeString,
					doctorScheduleThatDay.day_start_time,
					doctorScheduleThatDay.day_end_time
				) &&
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
							// disablePast
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

function isTimeInRange(time, startTime, endTime) {
	const parsedTime = new Date(`1970-01-01T${time}`);
	const parsedStartTime = new Date(`1970-01-01T${startTime}`);
	const parsedEndTime = new Date(`1970-01-01T${endTime}`);

	return parsedTime >= parsedStartTime && parsedTime <= parsedEndTime;
}
