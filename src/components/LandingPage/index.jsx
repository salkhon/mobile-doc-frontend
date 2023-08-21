import React, { useContext } from "react";
import Header from "../global/Header";
import { Box, Button, Grid, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined.js";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined.js";
import { ColorModeContext } from "../../contexts/ColorModeAndThemeContext";

export function LandingPage() {
	const navigate = useNavigate();
	const theme = useTheme();
	const colorModeCtx = useContext(ColorModeContext);

	return (
		<Grid
			container
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			alignSelf="center"
			minHeight="100vh"
		>
			<Grid
				item
				container
				justifyContent="center"
				alignItems="center"
			>
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
						<IconButton onClick={colorModeCtx.toggleColorMode}>
							{theme.palette.mode === "dark" ? (
								<LightModeOutlinedIcon />
							) : (
								<DarkModeOutlinedIcon />
							)}
						</IconButton>
					</Box>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</Grid>
	);
}
