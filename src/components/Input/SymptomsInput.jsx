import { Box, Typography } from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CRUDTable from "../Table/CRUDTable";

export function SymptomsInput({
	onChange, // get correlated symtoms
	suggestedSymtoms,
	onSymptomsSubmission, // get suggested doctors
	isDoctorsLoading,
}) {
	return (
		<Box margin="20px">
			<Box margin="10px" display="flex">
				<Typography variant="h3">Enter Symptoms</Typography>
			</Box>
			<Box margin="10px" display="flex" flexDirection="column">
				<CRUDTable
					cols={symptomCols}
					data={[]}
					onChange={onChange}
					what="Symptom"
					suggestedRows={suggestedSymtoms}
				/>
				<Box marginTop="10px">
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

const symptomCols = [
	{
		field: "symptom",
		headerName: "Symptom",
		type: "string",
		width: 200,
	},
	{
		field: "duration",
		headerName: "Duration (days)",
		type: "number",
		width: 200,
	},
];
