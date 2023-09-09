import { Grid } from "@mui/material";
import React from "react";
import UpcomingAppointmentsCard from "../../components/Card/PatientHome/UpcomingAppointmentsCard";
import DoctorStats from "../../components/Paper/DoctorStats";

export default function DoctorHome() {
	return (
		<Grid container>
			<Grid item xs={12}>
				<DoctorStats />
			</Grid>
			<Grid item xs={8} container>
				<Grid item xs={12}>
					{/* UPCOMING APPTS */}
					<UpcomingAppointmentsCard />
				</Grid>

				<Grid item xs={12}>
					{/* PEER REVIEW */}
				</Grid>
			</Grid>

			<Grid item xs={4}>
				{/* PENDING PRESCRIPTIONS */}
			</Grid>
		</Grid>
	);
}
