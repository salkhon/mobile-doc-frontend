import { Box, Typography } from "@mui/material";
import React from "react";
import SymptomTags from "./SymptomTags";
import LoadingButton from "@mui/lab/LoadingButton";

export function SymptomsInput({
	setSymptoms,
	onSymptomsSubmission,
	isDoctorsLoading,
}) {
	return (
		<Box margin="20px">
			<Box margin="10px" display="flex">
				<Typography variant="h3">Enter Symptoms</Typography>
			</Box>
			<Box margin="10px" display="flex">
				<SymptomTags setSymptoms={setSymptoms} />
				<Box marginTop="10px" marginLeft="20px">
					<LoadingButton
						variant="contained"
						color="secondary"
						loading={isDoctorsLoading}
						onClick={onSymptomsSubmission}
					>
						Submit
					</LoadingButton>
				</Box>
			</Box>
		</Box>
	);
}
