import React from "react";
import useQueryParam from "../../hooks/useQueryParam";
import { useQuery } from "react-query";
import LoadingBackdrop from "../global/LoadingBackdrop";
import { Box, Typography } from "@mui/material";
import Header from "../global/Header";
// import { useSearchParams } from "react-router-dom";

export default function AppointmentPage() {
	// todo: use search params (q param)
	// const [searchParams, setSearchParams] = useSearchParams();
	const queryParam = useQueryParam();
	const apptId = queryParam.get("id");

	return (
		<Box margin="20px">
			<Header
				title="APPOINTMENT - SHOW DATE AND TIME HERE"
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
