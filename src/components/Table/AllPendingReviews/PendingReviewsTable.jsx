import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten, styled } from "@mui/material/styles";
import { Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function PendingReviewsTable({ reviews }) {
	const navigate = useNavigate();

	return (
		<StyledDataGrid
			rows={reviews?.map(getRowFromReview)}
			columns={reviewCols}
			getRowClassName={
				(params) => `appt-row-${params.row.diagnosis.length}` // num diagnosis
			}
			style={{
				height: "100%",
			}}
			onRowClick={(params) => {
				if (navigate) navigate(`/review?id=${params.id}`);
			}}
		/>
	);
}

const reviewCols = [
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

function getRowFromReview(review) {
	return {
		id: review.session_id,
		advice: review.advice,
		suggestedTests: review.suggested_test_list,
		symptoms: review.symptom_list,
		diagnosis: !review.diagnosis ? [] : review.diagnosis.split(","),
	};
}
