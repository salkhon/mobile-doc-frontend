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
			alignSelf="center"
			minHeight="100vh"
		>
			<Grid item container xs={12} justifyContent="center">
				<Grid item xs={5}></Grid>
				<Grid item xs={7}>
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
				</Grid>
				<Grid item xs={5}></Grid>
				<Grid item xs={7}>
					<Box display="flex" justifyContent="flex-start">
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/login")}
							sx={{
								marginRight: 2,
							}}
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/signup")}
							sx={{
								marginRight: 2,
							}}
						>
							Signup Patient
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/doctorsignup")}
							sx={{
								marginRight: 2,
							}}
						>
							Signup Doctor
						</Button>
					</Box>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</Grid>
	);
}
