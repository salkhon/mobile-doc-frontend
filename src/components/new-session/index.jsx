import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SymptomTags from "../symptom-tags";
import { UserContext } from "../login/UserContext";
import Header from "../global/Header";

export default function NewSession() {
	const [sessionId, setSessionId] = useState(null);
	const user = useContext(UserContext);

	const [symptoms, setSymptoms] = useState([]);

	// todo: write handlers

	const handleSymptomSubmit = async (event) => {
		// create new session and POST symptoms
		console.log(symptoms);
		return;
		await fetch(`http://0.0.0.0:8000/session/new/${user.id}`)
			.then((resp) => resp.json())
			.then((data) => setSessionId(data["created_session_id"]))
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
		</Box>
	);
}
