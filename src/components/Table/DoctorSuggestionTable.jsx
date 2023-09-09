import React from "react";
import { Grid, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // can add extra filters
import { useTheme } from "@mui/material";

export default function DoctorSuggestionTable({
	suggestedDoctors,
	handleDoctorRowSelection,
}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Grid
			item
			xs={12}
			container
			sx={{
				".MuiDataGrid-root": {
					border: "none",
				},
				".MuiDataGrid-cell": {
					borderBottom: "none",
					backgroundColor: `${colors.greenAccent[800]}`,
				},
				// can target classes defined in column names
				".name-column--cell": {
					colors: colors.primary[700],
				},
				".MuiDataGrid-columnHeaders": {
					backgroundColor: `${colors.primary[800]}`,
					borderBottom: "none",
				},
				".MuiDataGrid-virtualScroller": {
					backgroundColor: colors.primary[400],
				},
				".MuiDataGrid-footerContainer": {
					borderTop: "none",
					backgroundColor: `${colors.primary[800]}`,
				},
				".MuiDataGrid-toolbarContainer .MuiButton-text": {
					color: `${colors.grey[100]}`,
				},
			}}
		>
			<Grid item xs={12}>
				<Typography variant="h3">Suggested Doctors</Typography>
			</Grid>
			<Grid item xs={12} height="40vh" overflow="auto">
				<DataGrid
					rows={suggestedDoctors}
					columns={columns}
					getRowId={(row) => row["doctor_id"]}
					onRowSelectionModelChange={handleDoctorRowSelection}
					slots={{
						toolbar: GridToolbar, // you can customize this as well!
					}}
					sx={{
						"& .Mui-selected": {
							backgroundColor:
								colors.primary[500] + " !important",
						},
					}}
				/>
			</Grid>
		</Grid>
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
