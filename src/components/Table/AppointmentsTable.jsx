import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { darken, lighten, styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

const getBackgroundColor = (color, mode) =>
	mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
	mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
	mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
	mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	"& .appt-row-0": {
		backgroundColor: getBackgroundColor(
			theme.palette.info.main,
			theme.palette.mode
		),
		"&:hover": {
			backgroundColor: getHoverBackgroundColor(
				theme.palette.info.main,
				theme.palette.mode
			),
		},
		"&.Mui-selected": {
			backgroundColor: getSelectedBackgroundColor(
				theme.palette.info.main,
				theme.palette.mode
			),
			"&:hover": {
				backgroundColor: getSelectedHoverBackgroundColor(
					theme.palette.info.main,
					theme.palette.mode
				),
			},
		},
	},
	"& .appt-row-1": {
		backgroundColor: getBackgroundColor(
			theme.palette.warning.main,
			theme.palette.mode
		),
		"&:hover": {
			backgroundColor: getHoverBackgroundColor(
				theme.palette.warning.main,
				theme.palette.mode
			),
		},
		"&.Mui-selected": {
			backgroundColor: getSelectedBackgroundColor(
				theme.palette.warning.main,
				theme.palette.mode
			),
			"&:hover": {
				backgroundColor: getSelectedHoverBackgroundColor(
					theme.palette.warning.main,
					theme.palette.mode
				),
			},
		},
	},
	"& .appt-row-2": {
		backgroundColor: getBackgroundColor(
			theme.palette.error.main,
			theme.palette.mode
		),
		"&:hover": {
			backgroundColor: getHoverBackgroundColor(
				theme.palette.error.main,
				theme.palette.mode
			),
		},
		"&.Mui-selected": {
			backgroundColor: getSelectedBackgroundColor(
				theme.palette.error.main,
				theme.palette.mode
			),
			"&:hover": {
				backgroundColor: getSelectedHoverBackgroundColor(
					theme.palette.error.main,
					theme.palette.mode
				),
			},
		},
	},
}));

export default function AppointmentsTable({ patientEHR }) {
	const { data } = useDemoData({
		dataSet: "Commodity",
		rowLength: 100,
	});

	console.log("demo data", data);
	console.log("appt table ehr", patientEHR);
	return (
		<Box height="76vh" width="100%">
			<StyledDataGrid
				rows={patientEHR?.patient_sessions
					?.filter(
						(appt) =>
							!!appt.symptom_list &&
							!!appt.doctor_id &&
							!!appt.start_time
					)
					.map(getRowFromAppt)}
				columns={apptCols}
				getRowClassName={
					(params) => `appt-row-${params.row.diagnosis.length}` // num diagnosis
				}
			/>
		</Box>
	);
}

const apptCols = [
	{
		field: "doctorId",
		headerName: "Doctor",
	},
	{
		field: "startTime",
		headerName: "Date",
		renderCell: (params) => new Date(params.value).toLocaleDateString(),
	},
	{
		field: "symptoms",
		headerName: "Symptoms",
		renderCell: (params) =>
			params.value?.map((symptom, idx) => (
				<Chip
					label={symptom.symptom_name}
					sx={{ margin: "1px" }}
					key={idx}
				/>
			)),
		flex: 1,
	},
	{
		field: "suggestedTests",
		renderCell: (params) =>
			params.value?.map((test, idx) => <Chip label={test} key={idx} />),
		flex: 1,
	},
	{
		field: "diagnosis",
		renderCell: (params) =>
			params.value?.map((diagnosis, idx) => (
				<Chip variant="outlined" label={diagnosis} key={idx} />
			)),
		flex: 1,
	},
	{ field: "advice", flex: 1 },
];

function getRowFromAppt(appt) {
	return {
		id: appt.session_id,
		advice: appt.advice,
		doctorId: appt.doctor_id,
		startTime: appt.start_time,
		suggestedTests: appt.suggested_test_list,
		symptoms: appt.symptom_list,
		diagnosis: !appt.diagnosis ? [] : appt.diagnosis.split(","),
	};
}
