import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../LoginPage/UserContext";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import DoctorSuggestionTable from "./DoctorSuggestionTable";
import { SymptomsInput } from "./SymptomsInput";
import {
	fetchPostSessionDoctorAndTime,
	fetchSuggestedDoctorsWithGivenSymptoms,
	getFormattedDateTime,
} from "../../api/appoinment";
import { AppointmentCard } from "./AppointmentCard";
import { LoadingButton } from "@mui/lab";

export default function NewAppointment() {
	const { user } = useContext(UserContext);

	const [sessionId, setSessionId] = useState(null);

	const [suggestedDoctors, setSuggestedDoctors] = useState(null);
	const [isSuggestedDoctorsLoading, setIsSuggestedDoctorsLoading] =
		useState(false);

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [appointmentTime, setAppointmentTime] = useState(null);

	const navigate = useNavigate();

	// when symptoms are submitted, load fetch suggested doctors
	// useEffect for lifecycle fetches (intial render, when prop changes that will surely cause rerender)
	const handleSymptomSubmission = (event, symptoms) => {
		setIsSuggestedDoctorsLoading(true);
		fetchSuggestedDoctorsWithGivenSymptoms(
			user,
			symptoms,
			setSessionId,
			setSuggestedDoctors,
			setIsSuggestedDoctorsLoading
		);
	};

	const handleDoctorSelection = (selection) => {
		const selectedDoctor = suggestedDoctors?.find(
			(doc) => doc.doctor_id === selection[0]
		);
		console.log("selected", selectedDoctor);
		setSelectedDoctor(selectedDoctor);
	};

	const handleBookAppointment = (eve) => {
		const datetime = getFormattedDateTime(appointmentTime);
		// update session doctor id
		console.log(selectedDoctor);
		fetchPostSessionDoctorAndTime(
			sessionId,
			// @ts-ignore
			selectedDoctor?.doctor_id,
			datetime,
			navigate
		);
	};

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

			{/** SET SYMPTOMS */}
			<SymptomsInput
				onSymptomsSubmission={handleSymptomSubmission}
				isDoctorsLoading={isSuggestedDoctorsLoading}
			/>

			{/** DOCTOR SUGGESTIONS and APPOINTMENT CARD */}
			<Box margin="20px">
				{suggestedDoctors && (
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
						patient={user.name}
						setAppointmentTime={setAppointmentTime}
					/>
					<LoadingButton
						variant="contained"
						color="secondary"
						onClick={handleBookAppointment}
						disabled={!appointmentTime}
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
