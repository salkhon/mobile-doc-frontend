import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../global/Header";
import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

export default function AppointmentPage() {
	// todo: use search params (q param)
	// const [searchParams, setSearchParams] = useSearchParams();
	const [searchParams] = useSearchParams();
	const apptId = searchParams.get("id");

	return (
		<Box margin="20px">
			<Header
				title={`APPOINTMENT ${apptId}`}
				subtitle="Show patient and doctor name here"
			/>
			{/* CALENDAR */}
			<Box flex="1 1 100%" marginLeft="15px">
				<Header title="Patient Details" />

				<Typography variant="h3">
					Previous Appointments <hr />
				</Typography>

				<Typography variant="h3">
					Test Results <hr />
				</Typography>
			</Box>
		</Box>
	);
}
