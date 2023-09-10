import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten, styled } from "@mui/material/styles";
import { Chip, Stack } from "@mui/material";

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

export default function AppointmentsTable({
	appts,
	userType,
	navigate = null,
}) {
	const userSpecificCols = React.useMemo(
		() => [
			userType === "doctor"
				? {
						field: "patientId",
						headerName: "Patient ID",
				  }
				: {
						field: "doctorId",
						headerName: "Doctor ID",
				  },
			...apptCols,
		],
		[userType]
	);

	return (
		<StyledDataGrid
			rows={appts
				?.filter(
					(appt) =>
						!!appt.symptom_list &&
						!!appt.doctor_id &&
						!!appt.start_time
				)
				.map(getRowFromAppt)}
			columns={userSpecificCols}
			getRowClassName={
				(params) => `appt-row-${params.row.diagnosis.length}` // num diagnosis
			}
			style={{
				height: "100%",
			}}
			onRowClick={(params) => {
				if (navigate) navigate(`/appointments?id=${params.id}`);
			}}
		/>
	);
}

const apptCols = [
	{
		field: "startTime",
		headerName: "Date",
		renderCell: (params) => new Date(params.value).toLocaleDateString(),
	},
	{
		field: "symptoms",
		headerName: "Symptoms",
		renderCell: (params) => (
			<Stack direction="row" overflow="auto">
				{params.value?.map((symptom, idx) => (
					<Chip
						label={symptom.symptom_name}
						sx={{ margin: "1px" }}
						key={idx}
					/>
				))}
			</Stack>
		),
		flex: 1,
	},
	{
		field: "suggestedTests",
		renderCell: (params) => (
			<Stack direction="row" overflow="auto">
				{params.value?.map((test, idx) => (
					<Chip label={test} key={idx} />
				))}
			</Stack>
		),
		flex: 1,
	},
	{
		field: "diagnosis",
		renderCell: (params) => (
			<Stack direction="row" overflow="auto">
				{params.value?.map((diagnosis, idx) => (
					<Chip variant="outlined" label={diagnosis} key={idx} />
				))}
			</Stack>
		),
		flex: 1,
	},
	{ field: "advice", flex: 1 },
];

function getRowFromAppt(appt) {
	return {
		id: appt.session_id,
		advice: appt.advice,
		doctorId: appt.doctor_id,
		patientId: appt.patient_id,
		startTime: appt.start_time,
		suggestedTests: appt.suggested_test_list,
		symptoms: appt.symptom_list,
		diagnosis: !appt.diagnosis ? [] : appt.diagnosis.split(","),
	};
}
