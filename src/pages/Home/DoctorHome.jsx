import { Grid } from "@mui/material";
import React from "react";
import UpcomingAppointmentsCard from "../../components/Card/PatientHome/UpcomingAppointmentsCard";
import DoctorStats from "../../components/Paper/DoctorHome/DoctorStats";
import { PendingPeerReviews } from "../../components/Paper/DoctorHome/PendingPeerReviews";

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
                    <PendingPeerReviews />
				</Grid>
			</Grid>
		</Grid>
	);
}
