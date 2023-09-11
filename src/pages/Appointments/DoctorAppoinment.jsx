import React from "react";
import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAppointment } from "../../api/session";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import { getPatientEHR } from "../../api/patient";
import PatientInfoCard from "../../components/Card/DoctorAppointment/PatientInfoCard";
import AppointmentTabs from "../../components/Tab/DoctorAppointment/AppointmentTabs";
import AppointmentSummaryCard from "../../components/Card/DoctorAppointment/AppointmentSummaryCard";

export default function DoctorAppointment() {
	const [searchParams] = useSearchParams();
	const apptId = searchParams.get("id");

	// appt data
	const getApptQuery = useQuery(["getAppt", apptId], getAppointment);

	// patient data
	const getPatientEHRQuery = useQuery(
		["getPatientEHR", getApptQuery.data?.patient_id],
		getPatientEHR,
		{
			enabled: !!getApptQuery.data, // get patient data after appt data is fetched,
		}
	);

	if (getApptQuery.isFetching || getPatientEHRQuery.isFetching) {
		return <LoadingBackdrop />;
	}

	if (getApptQuery.data && getPatientEHRQuery.data) {
		console.log("appt in appt page", getApptQuery.data);
		console.log("patient in appt page", getPatientEHRQuery.data);
	}

	return (
		<Grid container m={2} width="97%">
			<Grid item xs={12} m={1}>
				<AppointmentSummaryCard appt={getApptQuery.data} />
			</Grid>
			<Grid item xs={3} m={1}>
				<PatientInfoCard patientEHR={getPatientEHRQuery.data} />
			</Grid>
			<Grid item xs={8.09} m={1}>
				<AppointmentTabs
					appt={getApptQuery.data}
					patientEHR={getPatientEHRQuery.data}
				/>
			</Grid>
		</Grid>
	);
}
