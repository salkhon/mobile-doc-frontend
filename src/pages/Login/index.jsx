import React, { useEffect, useState } from "react";
import {
	Box,
	Container,
	Avatar,
	Typography,
	TextField,
	Grid,
	useTheme,
} from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";
import { postLogin } from "../../api/auth";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import FormBackground from "../../components/Box/FormBackground";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export function LoginPage() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const next = "/";

	const { setToken, setUserId, setUserName, setUserType } = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { data, refetch, isLoading, isError } = useQuery(
		[username, password],
		postLogin,
		{
			enabled: false,
			retry: false,
		}
	);

	function handleLogin(event) {
		event.preventDefault();
		refetch();
	}

	// execute when isError changes, check if it became true, then show snackbar
	useEffect(() => {
		if (isError) {
			enqueueSnackbar("Invalid Login", {
				variant: "error",
			});
		}
	}, [isError]);

	if (data) {
		console.log("Found login data in page component", data);
		setToken(data.token);
		setUserId(username);
		setUserName(username);
		setUserType(data.type);

		return <Navigate to={next} />;
	}

	return (
		<Container component="main" maxWidth="sm" sx={{ position: "relative" }}>
			<FormBackground mt={20}>
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
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
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
								to="/"
								style={{
									color: colors.greenAccent[500],
								}}
							>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								to="/signup"
								style={{
									color: colors.greenAccent[500],
								}}
							>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
						<Grid item>
							<Link
								to="/doctorsignup"
								style={{
									color: colors.greenAccent[500],
								}}
							>
								{"Are you a doctor? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</FormBackground>
			<SnackbarProvider />
		</Container>
	);
}
