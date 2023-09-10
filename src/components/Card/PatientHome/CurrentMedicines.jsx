import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import CurrentMedicinesList from "../../List/CurrentMedicinesList";

export default function CurrentMedicines() {
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
					<Typography variant="h3">Current Medicines</Typography>
				</Grid>
				<Grid item xs={12}>
					<CurrentMedicinesList />
				</Grid>
			</Grid>
		</Card>
	);
}
