import {
	Box,
	Button,
	Typography,
	useTheme,
	CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import SymptomTags from "../symptom-tags";
import { UserContext } from "../login/UserContext";
import Header from "../global/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function NewSession() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [sessionId, setSessionId] = useState(null);
	const user = useContext(UserContext);

	const [symptoms, setSymptoms] = useState([]);
	const [suggestedDoctors, setSuggestedDoctors] = useState([]);
	const [isSuggestedDoctorsLoading, setIsSuggestedDoctorsLoading] =
		useState(false);
	const [selectedDoctorId, setSelectedDoctorId] = useState(null);
	const [appointmentTime, setAppointmentTime] = useState(null);

	const navigate = useNavigate();

	const handleSymptomSubmit = (event) => {
		// create new session and POST symptoms and get suggested doctors
		console.log(symptoms);
		let newSessionId = "";
		setIsSuggestedDoctorsLoading(true);
		// create new session
		fetch(`${BASE_URL}/session/new/${user.id}`)
			.then((resp) => resp.json())
			.then((data) => {
				console.log("Session created", data["created_session_id"]);
				setSessionId(data["created_session_id"]);
				newSessionId = data["created_session_id"];
			})
			.then((_) => {
				// POST all symptoms to the newly created session
				console.log("POSTing symptoms on session", newSessionId);
				return Promise.all(
					symptoms.map((symptom) =>
						fetch(`${BASE_URL}/session/symptoms/${newSessionId}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								symptom_name: symptom,
								duration: 1,
								added_by: "patient",
							}),
						})
					)
				);
			})
			.then((_) => {
				// GET the suggested doctors for the given symptoms in the sesion
				console.log(_);
				return fetch(
					`${BASE_URL}/session/suggested_doctors/${newSessionId}`,
					{ mode: "cors" }
				);
			})
			.then((resp) => resp.json())
			.then((resp) => {
				// assign the fetched doctors list to the suggested doctors state
				console.log(resp);
				setSuggestedDoctors(resp["suggested_doctors"]);
				console.log(resp["suggested_doctors"]);
				setIsSuggestedDoctorsLoading(false);
			})
			.catch((err) =>
				console.error("Error fetching new session id", err)
			);
	};

	const handleDoctorRowSelection = (selection) => {
		console.log(selection);
		setSelectedDoctorId(selection[0]);
	};

	const handleBookAppointment = (event) => {
		const datetime = getFormattedDateTime(appointmentTime);
		console.log(
			`Update session ${sessionId} with doctor ${selectedDoctorId} and patient ${user.id} at time ${datetime}`
		);

		// update session doctor id
		// fetch(`${BASE_URL}/session/update_session_doctor/{session_id}`)
		// update session time
		fetch(`${BASE_URL}/session/update_session_time/${sessionId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				start_time: getFormattedDateTime(appointmentTime),
				end_time: getFormattedDateTime(appointmentTime),
			}),
		}).then((_) => {
			navigate("/calendar");
		});
	};

	return (
		<Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				margin="20px"
			>
				<Header
					title="Session"
					subtitle={`Create new session: ${sessionId}`}
				/>
			</Box>

			{/** SET SYMPTOMS */}
			<Box margin="20px">
				<Box margin="10px" display="flex">
					<Typography variant="h3">Enter Symptoms</Typography>
				</Box>
				<Box margin="10px" display="flex">
					<SymptomTags setSymptoms={setSymptoms} />
				</Box>
				<Box margin="10px" display="flex">
					<Button
						variant="contained"
						color="secondary"
						onClick={handleSymptomSubmit}
						disabled={isSuggestedDoctorsLoading}
					>
						{isSuggestedDoctorsLoading ? (
							<CircularProgress
								size={20}
								sx={{
									color: colors.greenAccent[300],
								}}
							></CircularProgress>
						) : (
							"Submit"
						)}
					</Button>
				</Box>
			</Box>

			{/** DOCTOR SUGGESTIONS */}
			{sessionId && (
				<Box margin="20px">
					<Box margin="10px" display="flex">
						<Typography variant="h3">Suggested Doctors</Typography>
					</Box>
					<Box
						margin="5px 0 0 0"
						sx={{
							".MuiDataGrid-root": {
								border: "none",
							},
							".MuiDataGrid-cell": {
								borderBottom: "none",
							},
							// can target classes defined in column names
							".name-column--cell": {
								colors: colors.greenAccent[300],
							},
							".MuiDataGrid-columnHeaders": {
								backgroundColor: colors.blueAccent[700],
								borderBottom: "none",
							},
							".MuiDataGrid-virtualScroller": {
								backgroundColor: colors.primary[400],
							},
							".MuiDataGrid-footerContainer": {
								borderTop: "none",
								backgroundColor: colors.blueAccent[700],
							},
							".MuiDataGrid-toolbarContainer .MuiButton-text": {
								color: `${colors.grey[100]}`,
							},
						}}
					>
						<DataGrid
							rows={suggestedDoctors}
							columns={columns}
							getRowId={(row) => row["doctor_id"]}
							onRowSelectionModelChange={handleDoctorRowSelection}
							slots={{
								toolbar: GridToolbar, // you can customize this as well!
							}}
							sx={{
								height: "50vh",
								"& .Mui-selected": {
									backgroundColor:
										colors.primary[500] + " !important",
								},
							}}
						/>
					</Box>

					{selectedDoctorId && (
						<Box
							display="flex"
							marginTop="10px"
							justifyContent="center"
						>
							<Box margin="15px">
								<Button
									variant="contained"
									color="secondary"
									onClick={handleBookAppointment}
								>
									Book Appointment
								</Button>
							</Box>
							<Box>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DemoContainer
										components={["DateTimePicker"]}
									>
										<DateTimePicker
											label="Basic date time picker"
											onChange={(val) =>
												setAppointmentTime(
													new Date(val)
												)
											}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</Box>
						</Box>
					)}
				</Box>
			)}
		</Box>
	);
}

const columns = [
	{
		field: "doctor_id",
		headerName: "ID",
		flex: 0.5,
	},
	{
		field: "name",
		headerName: "Name",
		flex: 1,
	},
	{
		field: "email",
		headerName: "Email",
		flex: 1,
	},
	{
		field: "designation",
		headerName: "Designation",
		flex: 1,
	},
	{
		field: "degrees",
		headerName: "Degrees",
		flex: 1,
	},
	{
		field: "speciality",
		headerName: "Speciality",
		flex: 1,
	},
];

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getFormattedDateTime(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day} ${hour}:${minute}`;
}
