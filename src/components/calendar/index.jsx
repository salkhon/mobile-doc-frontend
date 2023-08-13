import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { tokens } from "../../theme";
import React, { useContext, useEffect, useState } from "react";
import Header from "../global/Header";
import { UserContext } from "../login/UserContext";
import LoadingBackdrop from "../loading";

export default function Calendar() {
	const theme = useTheme();
	const user = useContext(UserContext);
	const colors = tokens(theme.palette.mode);

	const [currentEvents, setCurrentEvents] = useState(null);

	useEffect(() => {
		// fetch all schedules for this user
		if (user.userType === "patient") {
			console.log(user.id);
			fetch(`${BASE_URL}/patient/EHR/${user.id}`)
				.then((resp) => {
					console.log("raw resp ", resp);
					return resp.json();
				})
				.then((resp) => {
					console.log(resp);
					let sessions = resp.patient_sessions;
					sessions = sessions.map((session) => {
						return {
							session_id: session.session_id,
							session_starttime: session.start_time,
							session_endtime: session.end_time,
						};
					});
					setCurrentEvents(sessions);
				});
		} else {
			fetch(`${BASE_URL}/doctor/${user.id}`)
				.then((resp) => resp.json())
				.then((resp) => {
					console.dir(
						"Fetched user schedule for doctor ",
						resp.doctor.calendar
					);
					setCurrentEvents(resp.doctor.calendar);
				});
		}
	}, [user]);

	function handleDateClick(selected) {
		// fullCalendar provides you with `selected`
		const title = prompt("Please enter a new title for your event"); // standard browser alert
		// ^ for this you'd use a modal, for now just use an alert prompt.
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
		// todo: display modal and confirm reshedule
	}

	if (!currentEvents) {
		return <LoadingBackdrop />;
	}

	return (
		<Box margin="20px">
			<Header
				title="CALENDAR"
				subtitle="Full Calendar Interactive Page"
			/>
			<Box display="flex" justifyContent="space-between">
				{/* CALENDAR SIDEBAR */}
				<Box
					flex="1 1 20%"
					bgcolor={colors.primary[400]}
					padding="15px"
					borderRadius="4px"
					sx={{
						height: "75vh",
					}}
				>
					<Typography variant="h5"> Events </Typography>
					<List
						sx={{
							height: "95%",
							overflow: "auto",
						}}
					>
						{currentEvents.map((event) => (
							<ListItem
								key={event.session_id}
								style={{
									backgroundColor: colors.blueAccent[400],
									margin: "10px 0",
									borderRadius: "2px",
								}}
							>
								<ListItemText
									primary={event.session_id}
									secondary={
										<Typography>
											{new Date(
												event.session_starttime
											).toLocaleDateString("en-us", {
												weekday: "short",
												year: "2-digit",
												month: "short",
												day: "numeric",
												hour: "numeric",
												minute: "numeric",
												hour12: true,
											})}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				</Box>

				{/* CALENDAR */}
				<Box flex="1 1 100%" marginLeft="15px">
					<FullCalendar
						height="75vh"
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
						selectOverlap={false}
						eventOverlap={false}
						slotEventOverlap={false}
						slotDuration="00:15:00"
						slotMinTime="08:00:00"
						slotMaxTime="22:00:00"
						scrollTime={new Date().toLocaleTimeString("en-US", {
							hour12: false,
						})}
						select={handleDateClick}
						eventClick={handleEventClick}
						eventDrop={handleEventDrop}
						events={currentEvents.map((event) => {
							return {
								id: event.session_id,
								title: event.session_id,
								start: new Date(event.session_starttime),
							};
						})}
						// eventsSet={(events) => setCurrentEvents(events)}
						defaultTimedEventDuration={"00:15:00"}
						firstDay={6}
						defaultAllDay={false}
						initialEvents={[]}
						themeSystem={theme}
					/>
				</Box>
			</Box>
		</Box>
	);
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
