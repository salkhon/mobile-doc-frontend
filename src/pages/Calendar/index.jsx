import { Box } from "@mui/material";

import React, { useState } from "react";
import AppointmentCalendar from "../../components/Calendar/AppointmentCalendar";
import RescheduleConfirmationDialog from "../../components/Dialog/RescheduleConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useMutation, useQueryClient } from "react-query";
import { useAppointments } from "../../hooks/appointments";
import { postApptTime } from "../../api/patient";
import { getFormattedDateTime } from "../../api/session";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import Header from "../../components/Header/Header";

export default function Calendar() {
	const { userId, userType } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { appointments, setAppointments, isApptsLoading } = useAppointments(
		userId,
		userType
	);

	// reschedule
	const [isReschedDialogOpen, setIsReschedDialogOpen] = useState(false);
	const [rescheduleEventInfo, setRescheduleEventInfo] = useState(null);
	const rescheduleMutation = useMutation(postApptTime);

	function handleEventClick(selected) {
		navigate({
			pathname: "/appointments",
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
		rescheduleMutation.mutate({
			apptId: rescheduleEventInfo?.event.id,
			timeStr: rescheduleEventInfo
				? getFormattedDateTime(rescheduleEventInfo?.event.start)
				: "",
		});
		queryClient.invalidateQueries(["getAppointments"]);
		setIsReschedDialogOpen(false);
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
				isRescheduleLoading={rescheduleMutation.isLoading}
			/>
		</Box>
	);
}
