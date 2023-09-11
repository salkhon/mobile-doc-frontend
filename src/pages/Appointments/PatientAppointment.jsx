import React from "react";
import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAppointment } from "../../api/session";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import { getPatientEHR } from "../../api/patient";
import { getDoctor } from "../../api/doctor";
import DoctorInfoCard from "../../components/Card/PatientAppointment/DoctorInfoCard";
import PresciptionCard from "../../components/Card/PatientAppointment/PrescriptionCard";
import AppointmentSummaryCard from "../../components/Card/DoctorAppointment/AppointmentSummaryCard";

export default function PatientAppointment() {
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

	// doctor data
	const getDoctorQuery = useQuery(
		["getDoctor", getApptQuery.data?.doctor_id],
		getDoctor,
		{
			enabled: !!getApptQuery.data, // get doctor data after appt data is fetched,
		}
	);

	if (
		getApptQuery.isFetching ||
		getPatientEHRQuery.isFetching ||
		getDoctorQuery.isFetching
	) {
		return <LoadingBackdrop />;
	} else if (
		!getApptQuery.data?.doctor_id ||
		!getApptQuery.data?.start_time
	) {
		return (
			<Grid
				item
				xs={12}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				Session Is Incomplete
			</Grid>
		);
	}

	if (
		getApptQuery.data &&
		getPatientEHRQuery.data &&
		getDoctorQuery.data.doctor
	) {
		console.log("appt in appt page", getApptQuery.data);
		// print graph on pdf prescription?
		console.log("patient in appt page", getPatientEHRQuery.data);
		console.log("doctor in appt page", getDoctorQuery.data.doctor);
	}

	return (
		<Grid container width="97%" m={2}>
			<Grid item xs={12} m={1}>
				<AppointmentSummaryCard appt={getApptQuery.data} />
			</Grid>
			<Grid item xs={8.09} m={1}>
				<PresciptionCard
					patient={getPatientEHRQuery.data.patient_details}
					doctor={getDoctorQuery.data.doctor}
					appt={getApptQuery.data}
				/>
			</Grid>
			<Grid
				item
				xs={3}
				display="flex"
				justifyContent="center"
				alignItems="center"
				m={1}
			>
				<DoctorInfoCard
					doctor={getDoctorQuery.data?.doctor}
					appt={getApptQuery.data}
				/>
			</Grid>
		</Grid>
	);
}
