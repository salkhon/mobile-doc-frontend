import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export default function PatientInfoCard({ patient }) {
	return (
		<Card
			sx={{
				borderRadius: 3,
				height: "50vh",
				width: "52vw",
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
						alt="patient image"
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
								{patient.name}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography variant="h5" color="textSecondary">
								{patient.email}
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
								Birthday
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{patient.date_of_brth}
							</Typography>
						</Grid>
					</Grid>

					<Divider flexItem />

					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Phone number
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{patient.phone_no}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Address
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{patient.address}
							</Typography>
						</Grid>
					</Grid>

					<Divider flexItem />

					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Identification number
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{patient.identification_no}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5" color="textSecondary">
								Profession
							</Typography>
						</Grid>
						<Grid item xs={12} container justifyContent="center">
							<Typography variant="h5">
								{patient.profession}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}
