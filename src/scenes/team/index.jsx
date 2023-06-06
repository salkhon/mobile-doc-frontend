import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { mockDataTeam } from "../../data/mockData"; // normally through API calls
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
	AdminPanelSettingsOutlined,
	LockOpenOutlined,
	SecurityOutlined,
} from "@mui/icons-material";

export default function Team() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{
			field: "id",
			headerName: "ID",
		}, // grab "id" from row object, "ID" will be header of the table
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
		// can custom render elements as table data
		{
			field: "access",
			headerName: "Access Level",
			flex: 1,
			renderCell: (params) => {
				return (
					<Box
						width="60%"
						margin="0 auto"
						padding="5px"
						display="flex"
						justifyContent="center"
						bgcolor={
							params.row.access === "admin"
								? colors.greenAccent[600]
								: colors.greenAccent[700]
						}
						borderRadius="4px"
					>
						{params.row.access === "admin" && (
							<AdminPanelSettingsOutlined />
						)}
						{params.row.access === "manager" && (
							<SecurityOutlined />
						)}
						{params.row.access === "user" && <LockOpenOutlined />}
						<Typography
							color={colors.grey[100]}
							style={{ marginLeft: "5px" }}
						>
							{params.row.access}
						</Typography>
					</Box>
				);
			},
		},
	];

	return (
		<Box margin="20px">
			<Header title="TEAM" subtitle="Managing the Team Members" />

			<Box margin="40px 0 0 0" height="75vh">
				<DataGrid rows={mockDataTeam} columns={columns} />
			</Box>
		</Box>
	);
}
