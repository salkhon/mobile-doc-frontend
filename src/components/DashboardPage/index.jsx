import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../LoginPage/UserContext";
import PDB from "./PatientDash/main";
export function Dashboard() {
	const { user } = useContext(UserContext);
	return (
		<PDB />
	);
}

export default Dashboard;
