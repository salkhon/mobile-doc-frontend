import React from "react";
import Header from "../global/Header";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
	const navigate = useNavigate();

	return (
		<Grid
			container
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			minHeight="100vh"
		>
			<Grid item container xs={12} justifyContent="center">
				<Grid item mt="5px">
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
				</Grid>
				<Grid item>
					<Header
						title="PokéDoc"
						subtitle="Medical treatment in your pocket"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={() => navigate("/login")}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
