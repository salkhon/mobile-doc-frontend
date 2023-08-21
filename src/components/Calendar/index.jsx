import { Box } from "@mui/material";

import React, { useState } from "react";
import Header from "../global/Header";
import LoadingBackdrop from "../global/LoadingBackdrop";
import AppointmentCalendar from "./AppointmentCalendar";
import RescheduleConfirmationDialog from "./RescheduleConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useQuery } from "react-query";
import { useAppointments } from "../../hooks/appointments";
import { postApptTime } from "../../api/patient";
import { getFormattedDateTime } from "../../api/session";

export default function Calendar() {
	const { userId, userType } = useAuth();
	const navigate = useNavigate();

	const { appointments, setAppointments, isApptsLoading } = useAppointments(
		userId,
		userType
	);

	// todo: write a hook
	// reschedule
	const [isReschedDialogOpen, setIsReschedDialogOpen] = useState(false);
	const [rescheduleEventInfo, setRescheduleEventInfo] = useState(null);
	const rescheduleQuery = useQuery(
		[
			rescheduleEventInfo?.event.id,
			rescheduleEventInfo
				? getFormattedDateTime(rescheduleEventInfo?.event.start)
				: null,
		],
		postApptTime,
		{
			enabled: false,
		}
	);

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
		navigate({
			pathname: "/appointment",
			search: `?id=${selected?.event?.id}`,
		});
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
			// @ts-ignore
			appointments?.map((appt) =>
				appt.session_id === eventDropInfo.event.id
					? { ...appt, start_time: eventDropInfo.event.startStr }
					: appt
			)
		);
	}

	function handleRescheduleConfirm() {
		rescheduleQuery.refetch().then(() => {
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

	if (isApptsLoading) {
		return <LoadingBackdrop />;
	}

	return (
		<Box margin="20px">
			<Header title="CALENDAR" />

			{/* CALENDAR */}
			<Box flex="1 1 100%" marginLeft="15px">
				<AppointmentCalendar
					appointments={appointments}
					handleDateClick={handleDateClick}
					handleEventClick={handleEventClick}
					handleEventDrop={handleEventDrop}
				/>
			</Box>
			<RescheduleConfirmationDialog
				isOpen={isReschedDialogOpen}
				oldEvent={rescheduleEventInfo?.oldEvent}
				newEvent={rescheduleEventInfo?.event}
				handleConfirm={handleRescheduleConfirm}
				handleCancel={handleRescheduleCancel}
				isRescheduleLoading={rescheduleQuery.isLoading}
			/>
		</Box>
	);
}
