import { Grid, Typography } from "@mui/material";
import React from "react";
import PatientInfoCard from "../../components/Card/PatientProfile/PatientInfoCard";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import { getPatient } from "../../api/patient";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import PatientMedicalInfoCard from "../../components/Card/PatientProfile/PatientMedicalInfo";
import PatientTimeSeries from "../../components/Chart/PatientTimeSeries";

export default function PatientProfile() {
	const { userId } = useAuth();
	const { data, isFetching, error } = useQuery([userId], getPatient, {
		refetchOnWindowFocus: false,
	});

	if (isFetching) {
		return <LoadingBackdrop />;
	}

	if (error) {
		return <h2>{error.message}</h2>;
	}

	return (
		<Grid container>
			<Grid item xs={7.5}>
				<PatientInfoCard patient={data} />
			</Grid>
			<Grid item xs={4.5}>
				<PatientMedicalInfoCard patient={data} />
			</Grid>

			<Grid item xs={12}>
				<Typography variant="h2" fontWeight="bold" m={3}>
					Temporal Data
				</Typography>
				<PatientTimeSeries propertyData={randomData()} />
			</Grid>
		</Grid>
	);
}

function randomData() {
	function getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	function getRandomDate(start, end) {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		)
			.toISOString()
			.split("T")[0];
	}

	const dataPoints = [];

	for (let i = 0; i < 20; i++) {
		const value = getRandomFloat(150, 200);
		const date_added = getRandomDate(new Date(2022, 0, 1), new Date());

		const dataPoint = {
			name: "Height",
			value: value.toFixed(1),
			date_added: date_added,
		};

		dataPoints.push(dataPoint);
	}

	return dataPoints;
}
