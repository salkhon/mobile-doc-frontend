import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export default function DoctorInfoCard({ doctor }) {
	return (
		<Card
			sx={{
				borderRadius: 3,
				height: "50vh",
				width: "95%",
				m: "24px 4px 4px 24px",
			}}
		>
			<Grid
				container
				sx={{
					height: "100%",
				}}
			>
				{/* PROFILE PIC, NAME, EMAIL, APPT COUNT */}
				<Grid
					item
					container
					xs={4}
					justifyContent="center"
					alignItems="center"
				>
					{/* PROFILE PIC, NAME, EMAIL */}
					<Box
						component="img"
						sx={{
							height: 50,
							width: 50,
						}}
						alt="doctor image"
						src=""
					/>
					<Grid item xs={12} container justifyContent="center">
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography variant="h3" fontWeight="bold">
								{doctor?.name}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography variant="h5" color="textSecondary">
								{doctor?.email}
							</Typography>
						</Grid>
					</Grid>

					{/* APPOINTMENT COUNT */}
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						sx={{
							mb: -2,
						}}
					>
						<Typography variant="h4" fontWeight="bold">
							Appointments
						</Typography>
					</Grid>

					<Grid item xs={5} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h2">5</Typography>
						</Grid>

						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h6" color="textSecondary">
								Past
							</Typography>
						</Grid>
					</Grid>

					<Divider
						orientation="vertical"
						flexItem
						sx={{
							m: "10px 0",
						}}
					/>

					<Grid item xs={5} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h2">5</Typography>
						</Grid>

						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h6" color="textSecondary">
								Upcoming
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				<Divider
					orientation="vertical"
					flexItem
					sx={{
						m: "10px 0",
					}}
				/>

				{/* PERSONAL INFO */}
				<Grid
					item
					container
					xs={7.9}
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Gender
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">Male</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Designation
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{doctor?.designation}
							</Typography>
						</Grid>
					</Grid>

					<Divider flexItem />

					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Degrees
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{doctor?.degrees}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Speciality
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{doctor?.speciality}
							</Typography>
						</Grid>
					</Grid>

					<Divider flexItem />
				</Grid>
			</Grid>
		</Card>
	);
}
