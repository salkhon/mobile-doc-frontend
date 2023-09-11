import { Card, Grid, Link, Typography } from "@mui/material";
import React from "react";

export default function AppointmentSummaryCard({ appt }) {
	return (
		<Card sx={{ width: "94%" }}>
			<Grid container p={3}>
				<Grid item xs={4}>
					Patient:{" "}
					<Typography variant="h4">
						{appt.patient_name ?? appt.patient_id}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					Doctor:{" "}
					<Typography variant="h4">
						{appt.doctor_name ?? appt.doctor_id}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					Time:{" "}
					<Typography variant="h4">
						{new Date(appt.start_time).toLocaleString()}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					Meeting Link:
					<Link href={appt.video_call_link ?? ""}>
						{appt.video_call_link ?? ""}
					</Link>
				</Grid>
			</Grid>
		</Card>
	);
}
