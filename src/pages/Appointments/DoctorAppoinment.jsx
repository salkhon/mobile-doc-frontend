import React from "react";
import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAppointment } from "../../api/session";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import { getPatientEHR } from "../../api/patient";
import { getDoctor } from "../../api/doctor";
import PatientInfoCard from "../../components/Card/DoctorAppointment/PatientInfoCard";
import AppointmentTabs from "../../components/Tab/DoctorAppointment/AppointmentTabs";

export default function DoctorAppointment() {
	const [searchParams] = useSearchParams();
	const apptId = searchParams.get("id");

	// appt data
	const getApptQuery = useQuery(["getAppt", apptId], getAppointment, {
		refetchOnWindowFocus: false,
	});

	// patient data
	const getPatientEHRQuery = useQuery(
		["getPatientEHR", getApptQuery.data?.patient_id],
		getPatientEHR,
		{
			enabled: !!getApptQuery.data, // get patient data after appt data is fetched,
			refetchOnWindowFocus: false,
		}
	);

	// doctor data
	const getDoctorQuery = useQuery(
		["getDoctor", getApptQuery.data?.doctor_id],
		getDoctor,
		{
			enabled: !!getApptQuery.data, // get doctor data after appt data is fetched,
			refetchOnWindowFocus: false,
		}
	);

	if (
		getApptQuery.isFetching ||
		getPatientEHRQuery.isFetching ||
		getDoctorQuery.isFetching
	) {
		return <LoadingBackdrop />;
	}

	if (getApptQuery.data && getPatientEHRQuery.data && getDoctorQuery.data) {
		console.log("appt in appt page", getApptQuery.data);
		console.log("patient in appt page", getPatientEHRQuery.data);
		console.log("doctor in appt page", getDoctorQuery.data);
	}

	return (
		<Grid container height="91%">
			<Grid item xs={3} m={3}>
				<PatientInfoCard patientEHR={getPatientEHRQuery.data} />
			</Grid>
			<Grid item xs={8.09} m={3}>
				<AppointmentTabs
					appt={getApptQuery.data}
					patientEHR={getPatientEHRQuery.data}
				/>
			</Grid>
		</Grid>
	);
}
