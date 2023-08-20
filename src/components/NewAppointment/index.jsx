import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../global/Header";
import { Navigate } from "react-router-dom";
import DoctorSuggestionTable from "./DoctorSuggestionTable";
import { SymptomsInput } from "./SymptomsInput";
import { AppointmentCard } from "./AppointmentCard";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hooks/auth";
import { useSuggestedDoctors } from "../../hooks/suggestedDoctors";
import { useQueries, useQueryClient } from "react-query";
import { postApptDoctor, postApptTime } from "../../api/patient";
import { getFormattedDateTime } from "../../api/session";

export default function NewAppointment() {
	const { userId, userType, userName } = useAuth();
	const queryClient = useQueryClient();

	// remove existing query cache for new appointment
	useEffect(() => {
		queryClient.removeQueries();
	}, [queryClient]);

	const [symptoms, setSymptoms] = useState([]);

	// create patient appointment and get suggested doctors
	const { executeQuery, apptId, suggestedDoctors, isDoctorsLoading } =
		useSuggestedDoctors(userId, userType, symptoms);

	function handleSymptomSubmission() {
		executeQuery();
	}

	// confirm appointment doctor and time
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [apptDatetimeObj, setApptDatetimeObj] = useState(null);

	const [postApptDoctorQuery, postApptTimeQuery] = useQueries([
		{
			queryKey: [apptId, selectedDoctor?.doctor_id],
			queryFn: postApptDoctor,
			enabled: false,
		},
		{
			queryKey: [
				apptId,
				apptDatetimeObj ? getFormattedDateTime(apptDatetimeObj) : "",
			],
			queryFn: postApptTime,
			enabled: false,
		},
	]);

	function handleDoctorSelection(selection) {
		const selectedDoctor = suggestedDoctors?.find(
			(doc) => doc.doctor_id === selection[0]
		);
		console.log("selected", selectedDoctor);
		setSelectedDoctor(selectedDoctor);
	}

	async function handleBookAppointment() {
		await postApptDoctorQuery.refetch();
		await postApptTimeQuery.refetch();
	}

	if (postApptDoctorQuery.isSuccess && postApptTimeQuery.isSuccess) {
		return <Navigate to="/calendar" />;
	}

	return (
		<Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				margin="20px"
			>
				<Header title="Session" subtitle={`Create new session`} />
			</Box>

			{/** INPUT SYMPTOMS */}
			<SymptomsInput
				setSymptoms={setSymptoms}
				onSymptomsSubmission={handleSymptomSubmission}
				isDoctorsLoading={isDoctorsLoading}
			/>

			{/** DOCTOR SUGGESTIONS and APPOINTMENT CARD */}
			<Box margin="20px">
				{suggestedDoctors?.length > 0 && (
					<DoctorSuggestionTable
						suggestedDoctors={suggestedDoctors}
						handleDoctorRowSelection={handleDoctorSelection}
					/>
				)}
			</Box>

			{/* CONFIRM APPOINTMENT */}
			{selectedDoctor && (
				<Box
					margin="20px"
					display="flex"
					justifyContent="space-between"
				>
					<AppointmentCard
						doctor={selectedDoctor}
						patientName={userName}
						setAppointmentTime={setApptDatetimeObj}
					/>
					<LoadingButton
						variant="contained"
						color="secondary"
						loading={
							postApptDoctorQuery.isFetching ||
							postApptTimeQuery.isFetching
						}
						onClick={handleBookAppointment}
						disabled={!apptDatetimeObj}
						sx={{
							margin: "100px 74px 30px 10px",
						}}
					>
						Book Appointment
					</LoadingButton>
				</Box>
			)}
		</Box>
	);
}
