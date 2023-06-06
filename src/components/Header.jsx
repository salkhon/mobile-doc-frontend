import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function Header(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box marginBottom="30px">
			<Typography
				variant="h2"
				color={colors.grey[100]}
				fontWeight="bold"
				marginBottom="5px"
			>
				{props.title}
			</Typography>
			<Typography variant="h5" color={colors.greenAccent[400]}>
				{props.subtitle}
			</Typography>
		</Box>
	);
}
