import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../login/UserContext";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import DoctorSuggestionTable from "../doctor-suggestions";
import { SymptomsInput } from "./SymptomsInput";
import {
	fetchPostSessionDoctorAndTime,
	fetchSuggestedDoctorsWithGivenSymptoms,
} from "../../api/appoinment";
import { BookingConfirm } from "./BookingConfirm";

export default function NewSession() {
	const user = useContext(UserContext);

	const [sessionId, setSessionId] = useState(null);

	const [suggestedDoctors, setSuggestedDoctors] = useState(null);
	const [isSuggestedDoctorsLoading, setIsSuggestedDoctorsLoading] =
		useState(false);

	const [selectedDoctorId, setSelectedDoctorId] = useState(null);

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

	const handleBookAppointment = (event, appointmentTime) => {
		const datetime = getFormattedDateTime(appointmentTime);
		// update session doctor id
		fetchPostSessionDoctorAndTime(
			sessionId,
			selectedDoctorId,
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

			{/** DOCTOR SUGGESTIONS */}
			{suggestedDoctors && (
				<Box margin="20px">
					<Box margin="10px" display="flex">
						<Typography variant="h3">Suggested Doctors</Typography>
					</Box>
					<DoctorSuggestionTable
						suggestedDoctors={suggestedDoctors}
						handleDoctorRowSelection={(selection) =>
							setSelectedDoctorId(selection[0])
						}
					/>
					{selectedDoctorId && (
						<BookingConfirm
							handleBookAppointment={handleBookAppointment}
						/>
					)}
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
