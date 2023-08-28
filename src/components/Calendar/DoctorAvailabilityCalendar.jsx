import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import { Button, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header/Header";

const eventOpacity = "99";

export default function DoctorAvailabilityCalendar({ doctor }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [isEdit, setIsEdit] = useState(false);

	const [doctorAvailability, setDoctorAvailability] = useState(
		doctor?.availability
	);

	function handleSelect(e) {
		console.log("select", e);
	}

	function handleEventClick(e) {
		console.log("event", e);
	}

	function handleEditDoctorAvailabilityCancel() {
		setDoctorAvailability(doctor?.availability);
		setIsEdit(false);
	}

	function handleEditDoctorAvailabilitySave(e) {
		console.log("saving doctor avail", e, doctorAvailability);
	}

	return (
		<>
			<Grid item xs={12} container justifyContent="space-between">
				<Grid item xs={6}>
					<Header title="Doctor's Availability" />
				</Grid>
				<Grid
					item
					xs={6}
					display="flex"
					justifyContent="flex-end"
					alignItems="center"
				>
					{isEdit ? (
						<>
							<Button
								variant="contained"
								onClick={handleEditDoctorAvailabilitySave}
								sx={{
									m: 3,
								}}
							>
								Save
							</Button>
							<Button
								variant="contained"
								onClick={handleEditDoctorAvailabilityCancel}
								sx={{
									m: 3,
								}}
							>
								Cancel
							</Button>
						</>
					) : (
						<Button
							variant="contained"
							onClick={() => setIsEdit(true)}
							sx={{
								m: 2,
							}}
						>
							Edit
						</Button>
					)}
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<FullCalendar
					plugins={[timeGridPlugin, interactionPlugin]}
					headerToolbar={false}
					dayHeaderFormat={{
						weekday: "short",
					}}
					slotDuration="00:15:00"
					slotMinTime="08:00:00"
					slotMaxTime="22:00:00"
					slotEventOverlap={false}
					editable={isEdit}
					selectable={isEdit}
					unselectAuto={false}
					selectMirror={true}
					dayMaxEvents={true}
					eventDurationEditable={false}
					selectOverlap={false}
					eventOverlap={false}
					select={handleSelect}
					eventClick={handleEventClick}
					defaultTimedEventDuration={"00:15:00"}
					defaultAllDay={false}
					events={getArrayOfDatesFromDoctorAvailability(
						doctorAvailability
					)}
					eventColor={`${colors.secondary[500]}${eventOpacity}`}
					allDaySlot={false}
					slotLabelClassNames={"fc-doctor-avail-slotlabel"}
				/>
			</Grid>
		</>
	);
}

function formatDateWithDayAndTime(date) {
	const dayOfWeek = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
	}).format(date);
	const time = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
	}).format(date);

	return `${dayOfWeek}, ${time}`;
}

function getArrayOfDatesFromDoctorAvailability(doctorAvail) {
	if (!doctorAvail) {
		return [];
	}

	return doctorAvail.reduce((result, currentWeekDayAvail) => {
		result = result.concat(
			currentWeekDayAvail.day_start_times.map((startTime) => {
				const date = getCurrentWeeksDateOnDay(
					currentWeekDayAvail.day_of_the_week,
					startTime
				);
				return {
					title: formatDateWithDayAndTime(date),
					start: date.toISOString(),
				};
			})
		);
		return result;
	}, []);
}

/**
 * @param {string} day
 */
function getCurrentWeeksDateOnDay(day, timeStr) {
	const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	let currentDate = new Date();
	const dayShift = currentDate.getDay() - dayNames.indexOf(day);
	currentDate.setDate(currentDate.getDate() - dayShift);
	currentDate = setTimeOfDate(currentDate, timeStr);
	return currentDate;
}

/**
 * @param {Date} date
 * @param {string} timeString
 */
function setTimeOfDate(date, timeString) {
	var timeParts = timeString.split(":");
	var hours = parseInt(timeParts[0]);
	var minutes = parseInt(timeParts[1]);
	var seconds = parseInt(timeParts[2]);

	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(seconds);

	return date;
}
