import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Link,
	Skeleton,
	Stack,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import TestResultsList from "../../components/General/TestResultsList";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../hooks/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPatientEHR, postTestResult } from "../../api/patient";
import CRUDTable from "../../components/Table/CRUDTable";
import BasicDatePicker from "../../components/Datepicker/BasicDatePicker";

export default function TestResults() {
	const { userId } = useAuth();
	const queryClient = useQueryClient();
	const getPatientEHRQuery = useQuery(
		["getPatientEHR", userId],
		getPatientEHR
	);
	const postTestResultsMutation = useMutation(postTestResult, {
		onMutate: async ({ testResult }) => {
			await queryClient.cancelQueries(["getPatientEHR", userId]);
			queryClient.setQueryData(["getPatientEHR", userId], {
				...getPatientEHRQuery.data,
				test_results: [
					...getPatientEHRQuery.data?.test_results,
					dialogData,
				],
			});
		},
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogData, setDialogData] = useState(initDialogData);

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

	function handleSubmit(e) {
		postTestResultsMutation.mutate({
			testResult: {
				...dialogData,
				patient_id: userId,
			},
		});
		setIsDialogOpen(false);
		setDialogData(initDialogData);
	}

	function handleClose(e) {
		setIsDialogOpen(false);
	}

	console.log(
		"patient ehr data in test results",
		getPatientEHRQuery.data,
		dialogData
	);

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

					<Grid item xs={12} p={3}>
						<TextField
							label="Test Name"
							value={dialogData?.test_name}
							onChange={(e) =>
								setDialogData((old) => ({
									...old,
									test_name: e.target.value,
								}))
							}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
					<Grid item xs={12} p={3}>
						<BasicDatePicker
							label="Date Added"
							value={dialogData?.date}
							onChange={(datepickerObj) =>
								setDialogData((old) => ({
									...old,
									date: datepickerObj.$d.toISOString(),
								}))
							}
						/>
					</Grid>
					<Grid item xs={12} p={3}>
						<CRUDTable
							cols={numericCols}
							data={dialogData.numeric_results}
							onChange={(newrow, rows) => {
								setDialogData((prevData) => ({
									...prevData,
									numeric_results: rows
										.filter(
											(r) =>
												!!r.data_element &&
												!!r.data_value &&
												!!r.data_unit
										)
										.map((r) => ({
											data_element: r.data_element,
											data_unit: r.data_unit,
											data_value: r.data_value,
										})),
								}));
							}}
						/>
					</Grid>

					<Grid item xs={12} p={3}>
						<CRUDTable
							cols={fileCols}
							data={dialogData.test_files}
							onChange={(newrow, rows) => {
								setDialogData((prevData) => ({
									...prevData,
									test_files: rows
										.filter(
											(r) => !!r.file_name && !!r.file_url
										)
										.map((r) => ({
											file_name: r.file_name,
											file_url: r.file_url,
										})),
								}));
							}}
						/>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton onClick={handleSubmit}>Submit</LoadingButton>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}

const numericCols = [
	{
		field: "data_element",
		headerName: "Element",
		flex: 1,
	},
	{
		field: "data_value",
		headerName: "Value",
		type: "number",
		flex: 1,
	},
	{
		field: "data_unit",
		headerName: "Unit",
		flex: 1,
	},
];

const fileCols = [
	{
		field: "file_name",
		headerName: "File Name",
		flex: 1,
	},
	{
		field: "file_url",
		headerName: "File Url",
		flex: 1,
		renderCell: (params) => <Link href={params.value}>{params.value}</Link>,
	},
];

const initDialogData = {
	test_name: "",
	date: "",
	test_center: "",
	test_files: [],
	numeric_results: [],
};
