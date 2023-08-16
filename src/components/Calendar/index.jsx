import { Box } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import Header from "../global/Header";
import { UserContext } from "../LoginPage/UserContext";
import LoadingBackdrop from "../loading";
import {
	fetchPostUpdateSessionTime,
	fetchUserAppointments,
} from "../../api/appoinment";
import AppointmentCalendar from "./AppointmentCalendar";
import RescheduleConfirmationDialog from "./RescheduleConfirmationDialog";

export default function Calendar() {
	const { user } = useContext(UserContext);

	const [appointments, setAppointments] = useState(null);

	// reschedule
	const [isReschedDialogOpen, setIsReschedDialogOpen] = useState(false);
	const [isRescheduleLoading, setIsRescheduleLoading] = useState(false);
	const [rescheduleEventInfo, setRescheduleEventInfo] = useState(null);

	useEffect(() => {
		// fetch all schedules for this user
		fetchUserAppointments(user, setAppointments);
	}, [user]);

	function handleDateClick(selected) {
		const title = prompt("Please enter a new title for your event"); // standard browser alert
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		if (title) {
			calendarApi.addEvent({
				id: `${selected.startStr}-${title}`,
				title: title, // todo: put patient (for doctor) or doctor (for patient) name
				start: selected.startStr,
			});
		}
	}

	function handleEventClick(selected) {
		if (
			window.confirm(
				`Are you sure you want to delete the event '${selected.event.title}'?`
			)
		) {
			// again, you'd create modals for these
			selected.event.remove();
		}
	}

	function handleEventDrop(eventDropInfo) {
		console.log("event droppped", eventDropInfo);

		// event cannot be dragged to the past, past events cannot be dragged
		const currentDate = new Date();
		if (
			eventDropInfo.event.start < currentDate ||
			eventDropInfo.oldEvent.start < currentDate
		) {
			eventDropInfo.revert();
			return;
		}

		setRescheduleEventInfo(eventDropInfo);
		setIsReschedDialogOpen(true);

		// update frontend appointment list, pending confirmation - if confirmed then will POST to server
		setAppointments(
			appointments?.map((appt) =>
				appt.session_id === eventDropInfo.event.id
					? { ...appt, start_time: eventDropInfo.event.startStr }
					: appt
			)
		);
	}

	function handleRescheduleConfirm() {
		setIsRescheduleLoading(true);
		fetchPostUpdateSessionTime(
			rescheduleEventInfo?.event.id,
			rescheduleEventInfo?.event.startStr
		)
			.then(() => {
				setIsRescheduleLoading(false);
				setIsReschedDialogOpen(false);
			})
			.catch((err) => {
				alert("Cound not reschedule");
				setIsRescheduleLoading(false);
				setIsReschedDialogOpen(false);
			});
	}

	function handleRescheduleCancel(e) {
		console.log("trying to cancel", rescheduleEventInfo);
		// revert frontend appointment list
		const appointmentsCopy = [...appointments];
		appointmentsCopy[
			appointmentsCopy.findIndex(
				(appt) => appt.session_id === rescheduleEventInfo?.oldEvent.id
			)
		].start_time = rescheduleEventInfo?.oldEvent.startStr;
		setAppointments(appointmentsCopy);

		setIsReschedDialogOpen(false);
	}

	if (!appointments) {
		return <LoadingBackdrop />;
	}

	return (
		<Box margin="20px">
			<Header
				title="CALENDAR"
				subtitle="Full Calendar Interactive Page"
			/>
			<Box display="flex" justifyContent="space-between">
				{/* CALENDAR */}
				<Box flex="1 1 100%" marginLeft="15px">
					<AppointmentCalendar
						appointments={appointments}
						handleDateClick={handleDateClick}
						handleEventClick={handleEventClick}
						handleEventDrop={handleEventDrop}
					/>
				</Box>
			</Box>
			<RescheduleConfirmationDialog
				isOpen={isReschedDialogOpen}
				oldEvent={rescheduleEventInfo?.oldEvent}
				newEvent={rescheduleEventInfo?.event}
				handleConfirm={handleRescheduleConfirm}
				handleCancel={handleRescheduleCancel}
				isRescheduleLoading={isRescheduleLoading}
			/>
		</Box>
	);
}
