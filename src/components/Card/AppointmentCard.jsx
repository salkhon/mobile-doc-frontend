import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { AppointmentDatepicker } from "../Datepicker/AppointmentDatepicker";
import { tokens } from "../../theme";

export function AppointmentConfirmationCard({
	doctor,
	patientName,
	setAppointmentTime,
}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	console.log(doctor);

	return (
		<Grid item xs={8} container>
			<Grid item xs={12}>
				<Typography variant="h3">Appointment Summary</Typography>
			</Grid>
			<Grid item xs={12} mt={3}>
				<Card
					sx={{
						backgroundColor: colors.greenAccent[800],
					}}
				>
					<CardContent>
						<Grid container spacing="1">
							<Grid
								item
								xs={6}
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
							>
								<Typography variant="h5" margin="5px">
									Doctor:
									<AppointmentCardName>
										{doctor.name}
									</AppointmentCardName>
								</Typography>
								<Typography variant="h5" margin="5px">
									Patient:
									<AppointmentCardName>
										{patientName}
									</AppointmentCardName>
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant="h5" margin="5px">
									Appointment Time:
								</Typography>
								<AppointmentDatepicker
									doctor={doctor}
									setAppointmentTime={setAppointmentTime}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

function AppointmentCardName({ children }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<span
			style={{
				marginLeft: 10,
				backgroundColor: colors.greenAccent[900],
				borderRadius: 5,
				padding: 5,
			}}
		>
			{children}
		</span>
	);
}
