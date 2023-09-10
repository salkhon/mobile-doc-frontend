import React from "react";
import { Grid } from "@mui/material";
import UpcomingAppointmentsCard from "../../components/Card/PatientHome/UpcomingAppointmentsCard";
import PastDiagnosisCard from "../../components/Card/PatientHome/PastDiagnosis";
import PastAdvicesCard from "../../components/Card/PatientHome/PastAdvicesCard";
import PatientStats from "../../components/Paper/PatientStats";
import CurrentMedicines from "../../components/Card/PatientHome/CurrentMedicines";

export default function PatientHome() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<PatientStats />
			</Grid>
            
			<Grid item xs={5.8}>
				{/* UPCOMING APPOINTMENTS */}
				<UpcomingAppointmentsCard />
			</Grid>

			<Grid item xs={5.8}>
				{/* CURRENT MEDICINES */}
				<PastAdvicesCard />
			</Grid>

			<Grid item xs={5.8}>
				{/* DIAGNOSIS */}
				<PastDiagnosisCard />
			</Grid>

            <Grid item xs={5.8}>
				{/* MEDICINES */}
				<CurrentMedicines />
			</Grid>
		</Grid>
	);
}
