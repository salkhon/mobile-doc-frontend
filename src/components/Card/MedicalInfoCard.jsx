import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function MedicalInfoCard({ patient }) {
	// todo: do in a loop
	return (
		<Box maxWidth="70%" margin="20px 0px">
			<Card variant="outlined">
				<CardContent>
					<Grid container spacing={2} alignItems="flex-start">
						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Blood Group:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.general_information?.blood_group}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Diabetes:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.general_information?.diabetes
									? "✅"
									: "❌"}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Heart Condition:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.general_information?.heart_condition
									? "✅"
									: "❌"}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Kidney Problem:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.general_information?.kidney_problem
									? "✅"
									: "❌"}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
}
