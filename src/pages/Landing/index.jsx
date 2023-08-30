import React, { useContext } from "react";
import Header from "../../components/Header/Header";
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
			justifyContent="center"
			maxHeight="20vh"
			marginTop="30vh"
		>
			{/* LOGO AND TITLE */}
			<Grid
				item
				xs={12}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					component="img"
					sx={{
						height: 50,
						width: 50,
						margin: "10px 10px 40px 0",
					}}
					alt="pokedoc logo"
					src="./pokedoc-logo.png"
				/>
				<Header
					title="PokéDoc"
					subtitle="Medical treatment in your pocket"
				/>
			</Grid>

			{/* BUTTONS */}
			<Grid
				item
				xs={12}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/login")}
					sx={{
						marginLeft: 5,
						marginRight: 1,
					}}
				>
					Login
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/signup")}
					sx={{
						marginRight: 1,
					}}
				>
					Signup Patient
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/doctorsignup")}
					sx={{
						marginRight: 1,
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
			</Grid>
		</Grid>
	);
}
