import React from "react";
import {
	Box,
	Container,
	Avatar,
	Typography,
	TextField,
	FormControlLabel,
	Grid,
	Link,
	Checkbox,
	useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";

export function LoginPage({ setUser }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const navigate = useNavigate();

	function handleSubmit(event) {
		console.log(event);
		event.preventDefault();

		if (event.target[0].value === "patient") {
			setUser({
				userType: "patient",
				id: "0001",
				name: "Salman",
				token: "patient",
			});
			localStorage.setItem("pokedoc_token", "patient");
			navigate("/dashboard");
		} else if (event.target[0].value === "doctor") {
			setUser({
				userType: "doctor",
				id: "BD001",
				name: "Dr. Salman",
				token: "",
			});
			localStorage.setItem("pokedoc_token", "doctor");
			navigate("/dashboard");
		}
	}

	return (
		<>
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
			<Container
				component="main"
				maxWidth="sm"
				sx={{ position: "relative" }}
			>
				<Box
					sx={{
						marginTop: 12,
						padding: "12vh 6vw",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "rgba(11, 16, 27 , 0.8)",
						borderRadius: 10,
						boxShadow: theme.shadows[7],
					}}
				>
					<Avatar
						sx={{
							m: 1,
							bgcolor: "secondary",
							width: 100,
							height: 100,
						}}
						src="pokedoc-logo.png"
					></Avatar>
					<Typography component="h1" variant="h3">
						Log in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								backgroundColor: "#FC2C44",
								":hover": {
									backgroundColor: "#AB2328",
								},
							}}
						>
							Log In
						</LoadingButton>
						<Grid container>
							<Grid item xs>
								<Link
									href="#"
									variant="body2"
									color={colors.greenAccent[500]}
									fontSize={15}
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									href="#"
									variant="body2"
									color={colors.greenAccent[500]}
									fontSize={15}
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
}
