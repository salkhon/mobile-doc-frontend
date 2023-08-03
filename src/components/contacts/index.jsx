import React from "react";
import { Box } from "@mui/material";
import { mockDataContacts } from "../../data/mockData"; // normally through API calls
import { tokens } from "../../theme";
import Header from "../global/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // can add extra filters
import { useTheme } from "@mui/material";

export default function Contacts() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			flex: 0.5,
		}, // grab "id" from row object, "ID" will be header of the table
		{
			field: "registrarID",
			headerName: "Registrar ID",
		},
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		}, // flex makes this coumn grow
		{
			field: "age",
			headerName: "Age",
			type: "number",
			headerAlign: "left",
			align: "left",
		},
		{
			field: "phone",
			headerName: "Phone Number",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "address",
			headerName: "Address",
			flex: 1,
		},
		{
			field: "city",
			headerName: "City",
			flex: 1,
		},
		{
			field: "zipCode",
			headerName: "ZipCode",
			flex: 1,
		},
	];

	return (
		<Box margin="20px">
			<Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />

			<Box
				margin="40px 0 0 0"
				height="75vh"
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
                        color: `${colors.grey[100]}`
                    }
				}}
			>
				<DataGrid rows={mockDataContacts} columns={columns} 
                slots={{
                    toolbar: GridToolbar // you can customize this as well!
                }}
                />
			</Box>
		</Box>
	);
}
