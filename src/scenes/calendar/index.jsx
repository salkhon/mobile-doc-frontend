import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { tokens } from "../../theme";
import React, { useState } from "react";
import Header from "../../components/Header";

export default function Calendar() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// list of events that we can save in our calendar
	const [currentEvents, setCurrentEvents] = useState([]);

	function handleDateClick(selected) {
		// fullCalendar provides you with `selected`
		const title = prompt("Please enter a new title for your event"); // standard browser alert
		// ^ for this you'd use a modal, for now just use an alert prompt.
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		if (title) {
			calendarApi.addEvent({
				id: `${selected.dateStr}-${title}`,
				title,
				start: selected.startStr,
				end: selected.endStr,
				allDay: selected.allDay,
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
				>
					<Typography variant="h5"> Events </Typography>
					<List>
						{currentEvents.map((event) => (
							<ListItem
								key={event.id}
								style={{
									backgroundColor: colors.greenAccent[500],
									margin: "10px 0",
									borderRadius: "2px",
								}}
							>
								<ListItemText
									primary={event.title}
									secondary={
										<Typography>
											{formatDate(event.start, {
												year: "numeric",
												month: "short",
												day: "numeric",
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
						initialView="dayGridMonth"
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						select={handleDateClick}
						eventClick={handleEventClick}
						eventsSet={(events) => setCurrentEvents(events)}
						initialEvents={[
							{
								id: "1234",
								title: "All-day event",
								date: "2023-07-14",
							},
							{
								id: "4321",
								title: "Timed event",
								date: "2023-07-28",
							},
						]}
					/>
				</Box>
			</Box>
		</Box>
	);
}
