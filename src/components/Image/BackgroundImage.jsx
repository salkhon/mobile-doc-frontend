import React from "react";
import { Box, useTheme } from "@mui/material";

function BackgroundImage() {
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: "absolute",
				width: "100%",
				height: "100vh",
				backgroundImage: `url(${
					theme.palette.mode === "dark"
						? "background-bluered.jpg"
						: "background-whitered.jpg"
				})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				filter: "blur(10px)",
			}}
		/>
	);
}

export default BackgroundImage;
