import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function DoctorInfoCard({ doctor }) {
	console.log("in card", doctor);
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
								{doctor?.name}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Speciality:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{doctor?.speciality}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								email:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{doctor?.email}
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.secondary"
								gutterBottom
							>
								Qualifications:
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Typography
								sx={{ fontSize: 20 }}
								color="text.Primary"
								gutterBottom
							>
								{doctor?.degrees}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
}
