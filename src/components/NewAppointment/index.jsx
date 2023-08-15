import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../login/UserContext";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import DoctorSuggestionTable from "./DoctorSuggestionTable";
import { SymptomsInput } from "./SymptomsInput";
import {
	fetchPostSessionDoctorAndTime,
	fetchSuggestedDoctorsWithGivenSymptoms,
} from "../../api/appoinment";
import { AppointmentCard } from "./AppointmentCard";

export default function NewAppointment() {
	const user = useContext(UserContext);

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
					<Button
						variant="contained"
						color="secondary"
						onClick={handleBookAppointment}
						disabled={!appointmentTime}
						sx={{
							height: "50px",
							margin: "80px 10px 0 0",
						}}
					>
						Book Appointment
					</Button>
				</Box>
			)}
		</Box>
	);
}

function getFormattedDateTime(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day} ${hour}:${minute}`;
}
