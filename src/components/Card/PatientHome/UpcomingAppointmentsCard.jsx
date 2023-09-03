import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import UpcomingAppointmentList from "../../List/UpcomingAppointmentList";

export default function UpcomingAppointmentsCard() {
	return (
		<Card
			sx={{
				padding: 3,
				boxShadow: 2,
				height: "400px",
			}}
		>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h3">Upcoming Appointments</Typography>
				</Grid>
				<Grid item xs={12}>
					<UpcomingAppointmentList />
				</Grid>
			</Grid>
		</Card>
	);
}
