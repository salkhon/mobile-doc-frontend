import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import PastDiagnosisList from "../../List/PastDiagnosisList";

export default function PastDiagnosisCard() {
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
					<Typography variant="h3">Recent Diagnosis</Typography>
				</Grid>
				<Grid item xs={12}>
					<PastDiagnosisList />
				</Grid>
			</Grid>
		</Card>
	);
}
