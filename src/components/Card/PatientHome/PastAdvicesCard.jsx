import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import PastAdvicesList from "../../List/PastAdviceList";

export default function PastAdvicesCard() {
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
					<Typography variant="h3">Doctor's Advice</Typography>
				</Grid>
				<Grid item xs={12}>
					<PastAdvicesList />
				</Grid>
			</Grid>
		</Card>
	);
}
