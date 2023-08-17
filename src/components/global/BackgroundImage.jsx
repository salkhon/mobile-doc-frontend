import React from "react";
import { Box } from "@mui/material";

function BackgroundImage() {
	return (
		<Box
			sx={{
				position: "absolute",
				width: "100%",
				height: "100vh",
				backgroundImage: "url(background.png)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backdropFilter: "blur(5px)",
				filter: "blur(20px)",
			}}
		/>
	);
}

export default BackgroundImage;
