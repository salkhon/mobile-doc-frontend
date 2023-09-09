import { Grid, Typography } from "@mui/material";
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
		<Grid item xs={12} container>
			<Grid item xs={12} mb={3}>
				<Typography variant="h3">Enter Symptoms</Typography>
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12}>
					<CRUDTable
						cols={symptomCols}
						data={[]}
						onChange={onChange}
						what="Symptom"
						suggestedRows={suggestedSymtoms}
					/>
				</Grid>
				<Grid item xs={12} mt={1}>
					<LoadingButton
						variant="contained"
						color="secondary"
						loading={isDoctorsLoading}
						onClick={onSymptomsSubmission}
					>
						Submit
					</LoadingButton>
				</Grid>
			</Grid>
		</Grid>
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
