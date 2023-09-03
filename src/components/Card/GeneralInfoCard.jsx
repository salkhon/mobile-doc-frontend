import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function GeneralInfoCard({ patient }) {
	console.log("in card", patient);
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
								Name:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.name}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Date of Birth:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.date_of_brth}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Phone:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.phone_no}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Professsion:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.profession}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								ID:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.identification_no}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Address:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{patient?.address}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
}
