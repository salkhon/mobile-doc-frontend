import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SymptomTags from "./SymptomTags";
import { LoadingButton } from "./LoadingButton";

export function SymptomsInput({ onSymptomsSubmission, isDoctorsLoading }) {
	const [symptoms, setSymptoms] = useState(null);

	return (
		<Box margin="20px">
			<Box margin="10px" display="flex">
				<Typography variant="h3">Enter Symptoms</Typography>
			</Box>
			<Box margin="10px" display="flex">
				<SymptomTags setSymptoms={setSymptoms} />
				<Box marginTop="10px" marginLeft="20px">
					<LoadingButton
						isLoading={isDoctorsLoading}
						onClick={(e) => onSymptomsSubmission(e, symptoms)}
					>
						Submit
					</LoadingButton>
				</Box>
			</Box>
		</Box>
	);
}
