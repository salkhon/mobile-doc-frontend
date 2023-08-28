import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { tokens } from "../../theme";

const eventOpacity = "99";

export default function AppointmentCalendar({
	appointments,
	handleDateClick,
	handleEventClick,
	handleEventDrop,
}) {
	const { userType } = useAuth();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const oneHourBeforeCurrentDate = new Date();
	oneHourBeforeCurrentDate.setHours(oneHourBeforeCurrentDate.getHours() - 1);

	return (
		<FullCalendar
			height="78vh"
			plugins={[
				dayGridPlugin,
				timeGridPlugin,
				interactionPlugin,
				listPlugin,
			]}
			headerToolbar={{
				left: "prev,next,today",
				center: "title",
				right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
			}}
			initialView="timeGridWeek"
			editable={true}
			selectable={true}
			selectMirror={true}
			dayMaxEvents={true}
			nowIndicator={true}
			eventDurationEditable={false}
			allDaySlot={false}
			selectOverlap={false}
			eventOverlap={false}
			slotEventOverlap={false}
			slotDuration="00:15:00"
			slotMinTime="08:00:00"
			slotMaxTime="22:00:00"
			scrollTime={oneHourBeforeCurrentDate.toLocaleTimeString("en-US", {
				hour12: false,
			})}
			scrollTimeReset={false}
			select={handleDateClick}
			eventClick={handleEventClick}
			eventDrop={handleEventDrop}
			events={appointments.map((event) => {
				return {
					id: event.session_id,
					title: appointmentText(event, userType),
					start: new Date(event.start_time),
				};
			})}
			// eventsSet={(events) => setCurrentEvents(events)}
			defaultTimedEventDuration={"00:15:00"}
			defaultAllDay={false}
			initialEvents={[]}
			eventColor={`${colors.secondary[500]}${eventOpacity}`}
		/>
	);
}

function appointmentText(appointment, userType) {
	if (userType === "doctor") {
		return appointment.patient_name ?? appointment.patient_id;
	} else if (userType === "patient") {
		return appointment.doctor_name ?? appointment.doctor_id;
	}
}
