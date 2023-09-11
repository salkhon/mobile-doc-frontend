import { Grid, Typography } from "@mui/material";
import React from "react";
import TestResultPaper from "../../components/Paper/TestResult/TestResultPaper";

export default function TestResultsList({ patientEHR }) {
	return (
		<Grid item xs={12} m={3} container>
			<Grid item xs={12}>
				<Typography variant="h3">Test Results</Typography>
			</Grid>
			{patientEHR.test_results?.map((tr, idx) => (
				<Grid item xs={12} key={idx}>
					<TestResultPaper testResult={tr} />
				</Grid>
			))}
		</Grid>
	);
}
