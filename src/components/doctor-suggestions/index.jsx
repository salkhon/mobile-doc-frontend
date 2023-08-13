import React from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // can add extra filters
import { useTheme } from "@mui/material";

export default function DoctorSuggestionTable({ suggestedDoctors, handleDoctorRowSelection }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			margin="5px 0 0 0"
			sx={{
				".MuiDataGrid-root": {
					border: "none",
				},
				".MuiDataGrid-cell": {
					borderBottom: "none",
				},
				// can target classes defined in column names
				".name-column--cell": {
					colors: colors.greenAccent[300],
				},
				".MuiDataGrid-columnHeaders": {
					backgroundColor: colors.blueAccent[700],
					borderBottom: "none",
				},
				".MuiDataGrid-virtualScroller": {
					backgroundColor: colors.primary[400],
				},
				".MuiDataGrid-footerContainer": {
					borderTop: "none",
					backgroundColor: colors.blueAccent[700],
				},
				".MuiDataGrid-toolbarContainer .MuiButton-text": {
					color: `${colors.grey[100]}`,
				},
			}}
		>
			<DataGrid
				rows={suggestedDoctors}
				columns={columns}
				getRowId={(row) => row["doctor_id"]}
				onRowSelectionModelChange={handleDoctorRowSelection}
				slots={{
					toolbar: GridToolbar, // you can customize this as well!
				}}
				sx={{
					height: "50vh",
					"& .Mui-selected": {
						backgroundColor: colors.primary[500] + " !important",
					},
				}}
			/>
		</Box>
	);
}

const columns = [
	{
		field: "doctor_id",
		headerName: "ID",
		flex: 0.5,
	},
	{
		field: "name",
		headerName: "Name",
		flex: 1,
	},
	{
		field: "email",
		headerName: "Email",
		flex: 1,
	},
	{
		field: "designation",
		headerName: "Designation",
		flex: 1,
	},
	{
		field: "degrees",
		headerName: "Degrees",
		flex: 1,
	},
	{
		field: "speciality",
		headerName: "Speciality",
		flex: 1,
	},
];
