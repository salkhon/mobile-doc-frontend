import {
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import { AppointmentDatepicker } from "./AppointmentDatepicker";
import { tokens } from "../../theme";

export function AppointmentCard({ doctor, patientName, setAppointmentTime }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	console.log(doctor);

	return (
		<Box
			display="flex"
			flexDirection="column"
			width="80%"
			marginLeft="10px"
		>
			<Typography variant="h3">Appointment Summary</Typography>
			<Box display="flex" marginTop="10px" width="100%" height="100%">
				<Card
					sx={{
						backgroundColor: colors.primary[400],
						width: "100%",
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
			</Box>
		</Box>
	);
}

function AppointmentCardName({ children }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<span
			style={{
				marginLeft: 10,
				backgroundColor: colors.primary[500],
				borderRadius: 5,
				padding: 5,
			}}
		>
			{children}
		</span>
	);
}
