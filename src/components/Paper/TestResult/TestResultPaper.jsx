import { Grid, Link, Paper, Typography, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function TestResultPaper({ testResult }) {
	return (
		<Paper
			sx={{ width: "100%", margin: "12px 0", padding: 5 }}
			elevation={5}
		>
			<Grid container>
				<Grid item xs={12} pb={3} container>
					<CenteredGrid item xs={12}>
						<Typography variant="h3">
							{testResult.test_name}
						</Typography>
					</CenteredGrid>
					{!!testResult.test_center && (
						<CenteredGrid item xs={12}>
							<Typography variant="h6">
								{testResult.test_center}
							</Typography>
						</CenteredGrid>
					)}
					<CenteredGrid item xs={12}>
						<Typography variant="h5">
							{new Date(testResult.date).toLocaleDateString()}
						</Typography>
					</CenteredGrid>
				</Grid>

				<Grid item xs={6} p={3}>
					<Typography variant="h4" mb={1}>
						Numeric Results
					</Typography>
					{!!testResult.numeric_results && (
						<DataGrid
							rows={testResult.numeric_results.map(
								getRowFromNumericTestResult
							)}
							columns={numericCols}
						/>
					)}
				</Grid>

				<Grid item xs={6} p={3}>
					<Typography variant="h4" mb={1}>
						Files
					</Typography>
					{!!testResult.test_files && (
						<DataGrid
							rows={testResult.test_files.map(
								getRowFromFileTestResult
							)}
							columns={fileCols}
						/>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
}

const CenteredGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	margin: "12px 0",
}));

function getRowFromNumericTestResult(tr) {
	return {
		id: tr.data_element,
		elem: tr.data_element,
		val: `${tr.data_value} ${tr.data_unit}`,
	};
}

const numericCols = [
	{
		field: "elem",
		headerName: "Element",
		flex: 1,
	},
	{
		field: "val",
		headerName: "Value",
		flex: 1,
	},
];

function getRowFromFileTestResult(tr) {
	return {
		id: tr.file_name,
		...tr,
	};
}

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
