import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Navigate } from "react-router-dom";
import DoctorSuggestionTable from "../../components/Table/DoctorSuggestionTable";
import { SymptomsInput } from "../../components/Input/SymptomsInput";
import { AppointmentConfirmationCard } from "../../components/Card/AppointmentCard";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hooks/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
	getCreateNewAppt,
	getSuggestedDoctors,
	postApptDoctor,
	postApptTime,
	postSymtomOnAppointment,
} from "../../api/patient";
import { getFormattedDateTime } from "../../api/session";
import { isApptDatetimeInvalid } from "../../components/Datepicker/AppointmentDatepicker";

export default function NewAppointment() {
	const { userId, userType, userName } = useAuth();
	const queryClient = useQueryClient();
	const apptSummaryCardRef = useRef(null);

	// remove existing query cache for new appointment
	// todo: have a clear session button
	useEffect(() => {
		queryClient.removeQueries();
	}, [queryClient]);

	// create session
	const getApptIdQuery = useQuery(["getApptId", userId], getCreateNewAppt, {
		staleTime: Infinity, // create session only once
	});

	// with each syptoms addition, suggested symptoms is updated
	const postSymptomMutation = useMutation(postSymtomOnAppointment);

	function handleSymptomInput(sym) {
		console.log("symptom added", sym);
		postSymptomMutation.mutate({
			apptId: getApptIdQuery.data?.created_session_id,
			userType: userType,
			symptom: sym,
		});
	}

	// get suggested doctors
	const getSuggestedDoctorsQuery = useQuery(
		["getSuggestedDoctors", getApptIdQuery?.data?.created_session_id],
		getSuggestedDoctors,
		{
			enabled: false,
		}
	);

	function handleSymptomSubmission() {
		getSuggestedDoctorsQuery.refetch();
	}

	// confirm appointment doctor and time
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [apptDatepickerObj, setApptDatepickerObj] = useState(null);

	const postApptDoctorMutation = useMutation(postApptDoctor);
	const postApptTimeMutation = useMutation(postApptTime);

	function handleDoctorSelection(selection) {
		const selectedDoctor =
			getSuggestedDoctorsQuery?.data?.suggested_doctors?.find(
				(doc) => doc.doctor_id === selection[0]
			);
		console.log("selected", selectedDoctor, apptSummaryCardRef.current);
		setSelectedDoctor(selectedDoctor);
	}

	useEffect(() => {
		if (!!selectedDoctor) {
			apptSummaryCardRef.current?.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [selectedDoctor]);

	async function handleBookAppointment() {
		await postApptDoctorMutation.mutateAsync({
			apptId: getApptIdQuery.data?.created_session_id,
			doctorId: selectedDoctor?.doctor_id,
		});
		postApptTimeMutation.mutate({
			apptId: getApptIdQuery.data?.created_session_id,
			timeStr: apptDatepickerObj
				? getFormattedDateTime(apptDatepickerObj.$d)
				: "",
		});
	}

	if (postApptDoctorMutation.isSuccess && postApptTimeMutation.isSuccess) {
		// todo: merge?
		queryClient.removeQueries(["getApptId"]);
		queryClient.removeQueries(["getSuggestedDoctors"]);
		return <Navigate to="/calendar" />;
	}

	return (
		<Grid container m={3} width="97.2%">
			<Grid item xs={12}>
				<Header title="Session" subtitle={`Create new session`} />
			</Grid>

			{/** INPUT SYMPTOMS */}
			<Grid item xs={12} container>
				<SymptomsInput
					onChange={handleSymptomInput}
					suggestedSymtoms={
						postSymptomMutation.data?.correlated_symptoms
					}
					onSymptomsSubmission={handleSymptomSubmission}
					isDoctorsLoading={getSuggestedDoctorsQuery.isFetching}
				/>
			</Grid>

			{/** DOCTOR SUGGESTIONS */}
			<Grid item xs={12} container mt={5}>
				{getSuggestedDoctorsQuery.data && (
					<DoctorSuggestionTable
						suggestedDoctors={
							getSuggestedDoctorsQuery.data?.suggested_doctors
						}
						handleDoctorRowSelection={handleDoctorSelection}
					/>
				)}
			</Grid>

			{/* CONFIRM APPOINTMENT */}
			{selectedDoctor && (
				<Grid ref={apptSummaryCardRef} container mt={5}>
					<Grid item xs={12} container>
						<AppointmentConfirmationCard
							doctor={selectedDoctor}
							patientName={userName}
							setAppointmentTime={setApptDatepickerObj}
						/>
					</Grid>
					<Grid item xs={12} mt={1}>
						<LoadingButton
							variant="contained"
							color="secondary"
							loading={
								postApptDoctorMutation.isLoading ||
								postApptTimeMutation.isLoading
							}
							onClick={handleBookAppointment}
							disabled={
								!apptDatepickerObj ||
								isApptDatetimeInvalid(
									selectedDoctor,
									apptDatepickerObj
								)
							}
						>
							Book Appointment
						</LoadingButton>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
