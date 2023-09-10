import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Skeleton,
	Stack,
} from "@mui/material";
import React, { useState } from "react";
import TestResultsList from "../../components/General/TestResultsList";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hooks/auth";
import { useQuery } from "react-query";
import { getPatientEHR } from "../../api/patient";

export default function TestResults() {
	const { userId } = useAuth();
	const getPatientEHRQuery = useQuery(
		["getPatientEHR", userId],
		getPatientEHR
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	if (getPatientEHRQuery.isFetching) {
		return (
			<Stack spacing={2} m={3}>
				{[...Array(8).keys()].map((i) => (
					<Skeleton
						variant="rounded"
						width="90%"
						height="70px"
						key={i}
					/>
				))}
			</Stack>
		);
	}

	function handleSubmit(e) {}

	function handleClose(e) {
		setIsDialogOpen(false);
	}

	return (
		<Grid item xs={12} sx={{ width: "94%" }} container>
			<Grid item xs={12} display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					onClick={() => setIsDialogOpen(true)}
				>
					Add Test Result
				</Button>
			</Grid>
			<Grid item xs={12}>
				<TestResultsList patientEHR={getPatientEHRQuery.data} />
			</Grid>

			{/* ADD TEST RESULT DIALOG */}
			<Dialog open={isDialogOpen} onClose={(e) => setIsDialogOpen(false)}>
				<DialogTitle>Add Test Result</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Provide test result details
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton onClick={handleSubmit}>Submit</LoadingButton>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}
