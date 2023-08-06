import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SymptomTags from "../symptom-tags";
import { UserContext } from "../login/UserContext";
import Header from "../global/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

export default function NewSession() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [sessionId, setSessionId] = useState(null);
	const user = useContext(UserContext);

	const [symptoms, setSymptoms] = useState([]);
	const [suggestedDoctors, setSuggestedDoctors] = useState([]);

	// todo: write handlers

	const handleSymptomSubmit = (event) => {
		// create new session and POST symptoms and get suggested doctors
		console.log(symptoms);
		let newSessionId = "";
		// create new session
		fetch(`http://0.0.0.0:8000/session/new/${user.id}`)
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
						fetch(
							`http://0.0.0.0:8000/session/symptoms/${newSessionId}`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									symptom_name: symptom,
									duration: 1,
									added_by: "patient",
								}),
							}
						)
					)
				);
			})
			.then((_) => {
				// GET the suggested doctors for the given symptoms in the sesion
				console.log(_);
				return fetch(
					`http://0.0.0.0:8000/session/suggested_doctors/${newSessionId}`,
					{ mode: "cors" }
				);
			})
			.then((resp) => resp.json())
			.then((resp) => {
				console.log(resp);
				setSuggestedDoctors(resp["suggested_doctors"]);
				console.log(resp["suggested_doctors"]);
			})
			.catch((err) =>
				console.error("Error fetching new session id", err)
			);
	};
	//todo: render suggested doctors after you get session id

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
					>
						Submit
					</Button>
				</Box>
			</Box>

			{/** DOCTOR SUGGESTIONS */}
			{sessionId && (
				<Box margin="20px">
					<Header title="Suggested Doctors" />
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
							slots={{
								toolbar: GridToolbar, // you can customize this as well!
							}}
							sx={{
								height: "50vh",
							}}
						/>
					</Box>
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
