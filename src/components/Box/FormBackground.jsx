import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const opacity = "AA";

export default function FormBackground({ children, mt }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box
			sx={{
				marginTop: mt,
				maxHeight: "100%",
				marginBottom: 10,
				padding: "6vh 6vw",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: `${colors.grey[900]}${opacity}`,
				borderRadius: 10,
				boxShadow: theme.shadows[9],
                overflow: "auto"
			}}
		>
			{children}
		</Box>
	);
}
