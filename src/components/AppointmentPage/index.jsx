import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../global/Header";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAppointment } from "../../api/session";
import LoadingBackdrop from "../global/LoadingBackdrop";
import { getPatientEHR } from "../../api/patient";
import { getDoctor } from "../../api/doctor";
import SymptomsDurationTable from "./SymptomsDurationTable";
import GeneralInfoCard from "./GeneralInfoCard";
import MedicalInfoCard from "./MedicalInfoCard";
import DoctorInfoCard from "./DoctorInfoCard";
// import { useSearchParams } from "react-router-dom";

export default function AppointmentPage() {
	const [searchParams] = useSearchParams();
	const apptId = searchParams.get("id");

	// session data
	const { data: appointment, isFetching: isFetchingAppt } = useQuery(
		[apptId],
		getAppointment
	);

	// patient data
	const { data: patient, isFetching: isFetchingPatient } = useQuery(
		[appointment?.patient_id],
		getPatientEHR,
		{
			enabled: !!appointment,
		}
	);

	// doctor data
	const { data: doctor, isFetching: isFetchingDoctor } = useQuery(
		[appointment?.doctor_id],
		getDoctor,
		{
			enabled: !!appointment,
		}
	);

	if (isFetchingAppt || isFetchingPatient || isFetchingDoctor) {
		return <LoadingBackdrop />;
	}

	if (appointment && patient && doctor) {
		console.log("appt in appt page", appointment);
		console.log("patient in appt page", patient);
		console.log("doctor in appt page", doctor);
	}

	return (
		<Box margin="20px">
			<Header
				title={`${doctor?.name} and ${patient?.name}`}
				subtitle={`${new Date(
					appointment?.start_time
				).toLocaleString()}`}
			/>

			<Box flex="1 1 100%" marginLeft="15px">
				<Box>
					<Header title="Appointment Info" />

					<Box>
						<Typography variant="h3">
							Symptoms <hr />
						</Typography>
						<SymptomsDurationTable
							rows={appointment.symptom_list}
						/>
					</Box>

					<Typography variant="h3">
						Previous Prescriptions <hr />
					</Typography>

					<Typography variant="h3">
						Relevant Test Results <hr />
					</Typography>
				</Box>

				<Box marginTop={5}>
					<Header title="Patient Details" />

					<Box>
						<Typography variant="h3">
							General Info <hr />
						</Typography>
						<GeneralInfoCard patient={patient} />
					</Box>

					<Box>
						<Typography variant="h3">
							Medical Info <hr />
						</Typography>
						<MedicalInfoCard patient={patient} />
					</Box>

					<Typography variant="h3">
						Time Series <hr />
					</Typography>

					<Typography variant="h3">
						Previous Appointments <hr />
					</Typography>

					<Typography variant="h3">
						Test Results <hr />
					</Typography>
				</Box>

				<Box>
					<Header title="Doctor Details" />
					<DoctorInfoCard doctor={doctor} />
				</Box>
			</Box>
		</Box>
	);
}
