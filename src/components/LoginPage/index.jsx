import React, { useState } from "react";
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
import { Navigate, useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";
import { postLogin } from "../../api/auth";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";

export function LoginPage() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const location = useLocation();
	const next = location.state?.from?.pathname || "/";

	const { setToken, setUserId, setUserName, setUserType } = useAuth();

	const [email, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { data, refetch, isLoading, error } = useQuery(
		[email, password],
		postLogin,
		{
			enabled: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	);

	function handleLogin(event) {
		event.preventDefault();
		refetch();
	}

	if (error) {
		alert("Could not login:", error.message);
	}

	if (data) {
		// todo: send back usertype
		console.log("Found login data in page component", data);
		setToken(data.token);
		setUserId(email);
		setUserName(email);
		setUserType("patient");

		return <Navigate to={next} />;
	}

	return (
		<Container component="main" maxWidth="sm" sx={{ position: "relative" }}>
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
				<Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						onChange={(e) => setUsername(e.target.value)}
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
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						loading={isLoading}
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
	);
}
