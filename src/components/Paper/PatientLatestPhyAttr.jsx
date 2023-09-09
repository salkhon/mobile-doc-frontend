import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

export default function PatientLatestPhyAttr({ attr, val }) {
	return (
		<Paper variant="outlined" sx={{ border: 1, borderRadius: 2 }}>
			<Grid container justifyContent="center" alignItems="center">
				<Grid item xs={2} p={0.5}>
					<QueryStatsOutlinedIcon
						sx={{
							fontSize: 15,
						}}
					/>
				</Grid>
				<Grid
					item
					xs={10}
					container
					justifyContent="center"
					alignItems="center"
					p="10px 20px 10px 15px"
				>
					<Grid item xs={12}>
						<Typography>{attr}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h5" fontWeight="light">
							{val}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
