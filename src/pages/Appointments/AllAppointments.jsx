import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import AppointmentsTable from "../../components/Table/AppointmentsTable";
import { useAuth } from "../../hooks/auth";
import { useQuery } from "react-query";
import { getAppointments } from "../../api/session";
import { useNavigate } from "react-router-dom";

export default function AllAppointments() {
	const { userId, userType } = useAuth();
	const navigate = useNavigate();

	const getApptsQuery = useQuery(
		["getAppts", userId, userType],
		getAppointments,
		{ refetchOnWindowFocus: false }
	);

	if (getApptsQuery.isFetching) {
		return (
			<Stack spacing={2} m={3}>
				{[...Array(12).keys()].map((i) => (
					<Skeleton
						variant="rounded"
						width="90%"
						height="50px"
						key={i}
					/>
				))}
			</Stack>
		);
	}

	console.log("appts in all", getApptsQuery.data);
	return (
		<Grid item xs={12} m={3} sx={{ height: "87vh" }}>
			<AppointmentsTable
				appts={getApptsQuery.data.filter(
					(appt) =>
						!!appt.symptom_list &&
						!!appt.doctor_id &&
						!!appt.start_time
				)}
				userType={userType}
				navigate={navigate}
			/>
		</Grid>
	);
}
