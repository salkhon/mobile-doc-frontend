import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

export default function PatientLatestPhyAttr({ attr, val }) {
	return (
		<Paper variant="outlined">
			<Grid container justifyContent="center" alignItems="center">
				<Grid item xs={4}>
					<QueryStatsOutlinedIcon
						sx={{
							fontSize: 40,
						}}
					/>
				</Grid>
				<Grid
					item
					xs={8}
					container
					justifyContent="center"
					alignItems="center"
					p={2}
				>
					<Grid item xs={12}>
						<Typography>{attr}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4" fontWeight="light">
							{val}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
