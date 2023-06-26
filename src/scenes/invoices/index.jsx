import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { mockDataInvoices } from "../../data/mockData"; // normally through API calls
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid} from "@mui/x-data-grid"; // can add extra filters

export default function Invoices() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			flex: 0.5,
		}, // grab "id" from row object, "ID" will be header of the table
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		}, // flex makes this coumn grow
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
			field: "cost",
			headerName: "Cost",
			flex: 1,
			renderCell: (params) => (
				<Typography color={colors.greenAccent[500]}>
					${params.row.cost}
				</Typography>
			),
		},
		{
			field: "date",
			headerName: "Date",
			flex: 1,
		},
	];

	return (
		<Box margin="20px">
			<Header title="INVOICES" subtitle="List of Invoice Balances" />

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
					".MuiCheckbox-root": {
						color: `${colors.greenAccent[200]}`,
					},
				}}
			>
				<DataGrid
					rows={mockDataInvoices}
					columns={columns}
					checkboxSelection={true} // you can have action button on the footer, and MUI will give you the 
                    // selected items, and you can make an API call or somtething.
				/>
			</Box>
		</Box>
	);
}
