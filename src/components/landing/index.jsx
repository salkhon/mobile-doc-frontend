import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";

export function LandingPage() {
	return (
		<>
			<Box display="flex" justifyContent="center" margin="20px">
				<Box
					component="img"
					sx={{
						height: 50,
						width: 50,
						marginRight: "20px",
					}}
					alt="pokedoc logo"
					src="./pokedoc-logo.png"
				/>
				<Header
					title="PokéDoc"
					subtitle="Medical treatment in your pocket"
				/>
			</Box>
			<Box display="flex" justifyContent="center">
				<Box
					component="img"
					alt="clown"
					src="assets/teleclowndoc1.jpg"
				/>
			</Box>
		</>
	);
}
