import React, { useState } from "react";
import Header from "../global/Header";
import { Box, Select, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LoginPage({ setUser }) {
	let [type, setType] = useState("patient");
	const navigate = useNavigate();

	function handleChange(event) {
		console.log(event);
		setType(event.target.value);
	}

	function handleClick(arg) {
		// go to dashboard
		// pass state of usertype back to App
		setUser({
			userType: type,
			id: type === "patient" ? "0001" : "BD001",
			name: type === "patient" ? "Salman" : "Dr. Salman",
			token: "",
		});
		navigate("/dashboard");
	}

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
			<Box display="flex" justifyContent="center" margin="10px">
				<Select value={type} onChange={handleChange}>
					<MenuItem value="patient">Patient</MenuItem>
					<MenuItem value="doctor">Doctor</MenuItem>
				</Select>
			</Box>
			<Box display="flex" justifyContent="center">
				<Button
					variant="contained"
					color="secondary"
					onClick={handleClick}
					sx={{
						margin: "10px",
					}}
				>
					Login
				</Button>
			</Box>
		</>
	);
}
