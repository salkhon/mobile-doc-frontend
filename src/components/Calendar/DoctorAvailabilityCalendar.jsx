import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import { Button, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header/Header";
import { useQueryClient } from "react-query";

const eventOpacity = "99";
const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function DoctorAvailabilityCalendar({ doctor, onSave }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const queryClient = useQueryClient();

	const [isAvailEdit, setIsAvailEdit] = useState(false);

	const [doctorAvailability, setDoctorAvailability] = useState(
		doctor?.availability
	);

	function handleSelect(e) {
		e?.view.calendar.unselect();
		const dayName = dayNames[e?.start?.getDay()];
		const timeStr = getTimeString(e?.start);
		setDoctorAvailability((prevAvailability) => {
			const dayIdx = prevAvailability.findIndex(
				(weekDay) => weekDay.day_of_the_week === dayName
			);
			const newAvailability = [...prevAvailability];
			newAvailability[dayIdx].day_start_times.push(timeStr);
			return newAvailability;
		});
	}

	function handleEventClick(e) {
		if (!isAvailEdit) {
			return;
		}

		console.log("event", e);
		const dayName = dayNames[e?.event?.start?.getDay()];
		const timeStr = getTimeString(e?.event?.start);
		setDoctorAvailability((prevAvailability) => {
			const dayIdx = prevAvailability.findIndex(
				(weekday) => weekday.day_of_the_week === dayName
			);
			const newAvailability = [...prevAvailability];
			const timeIdx =
				newAvailability[dayIdx].day_start_times.indexOf(timeStr);
			newAvailability[dayIdx].day_start_times.splice(timeIdx, 1);
			return newAvailability;
		});
	}

	function handleEditDoctorAvailabilityCancel() {
		setIsAvailEdit(false);
		queryClient.invalidateQueries(["getDoctor", doctor?.doctor_id]);
	}

	function handleEditDoctorAvailabilitySave(e) {
		onSave(doctorAvailability);
		setIsAvailEdit(false);
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
					{isAvailEdit ? (
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
							onClick={() => setIsAvailEdit(true)}
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
					editable={isAvailEdit}
					selectable={isAvailEdit}
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
				// select overlap issue
				const endDate = new Date(date);
				endDate.setMinutes(endDate.getMinutes() + 14);
				return {
					id: date.toISOString(),
					title: formatDateWithDayAndTime(date),
					start: date.toISOString(),
					end: endDate.toISOString(),
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

/**
 * @param {Date} dateObj
 */
function getTimeString(dateObj) {
	var hours = dateObj.getHours().toString().padStart(2, "0");
	var minutes = dateObj.getMinutes().toString().padStart(2, "0");
	var seconds = dateObj.getSeconds().toString().padStart(2, "0");

	return hours + ":" + minutes + ":" + seconds;
}
