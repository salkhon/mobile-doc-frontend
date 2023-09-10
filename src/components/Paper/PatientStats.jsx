import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { getAppointments } from "../../api/session";
import { getPatient } from "../../api/patient";

export default function PatientStats() {
	const { userId } = useAuth();
	const getPatientQuery = useQuery(["getPatient", userId], getPatient);
	const getApptsQuery = useQuery(
		["getAppts", userId, "patient"],
		getAppointments,
		{
			staleTime: 100e3,
		}
	);

	const numAppts = useMemo(
		() =>
			getApptsQuery.data?.filter(
				(appt) =>
					!!appt.doctor_id && !!appt.symptom_list && !!appt.start_time
			).length ?? 0,
		[getApptsQuery.data]
	);
	const totalDocs = useMemo(
		() =>
			getApptsQuery.data
				?.filter(
					(appt) =>
						!!appt.doctor_id &&
						!!appt.symptom_list &&
						!!appt.start_time
				)
				.reduce((docSet, appt) => docSet.add(appt.doctor_id), new Set())
				.size ?? 0,
		[getApptsQuery.data]
	);

	if (getPatientQuery.isFetching || getApptsQuery.isFetching) {
		return (
			<Stack direction="row" pb={5} spacing={3}>
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
			</Stack>
		);
	}

	console.log("patient stats", getPatientQuery.data, getApptsQuery.data);

	return (
		<Stack direction="row" pb={5} spacing={3} alignItems="center">
			<StyledPaper elevation={5}>
				<Grid container>
					<CenteredGrid item xs={4}>
						<PermContactCalendarOutlinedIcon
							fontSize="large"
							sx={{ color: "green" }}
						/>
					</CenteredGrid>
					<Grid item xs={8} container>
						<Grid item xs={12}>
							<Typography
								variant="h5"
								fontWeight="light"
								color="grey"
							>
								Total Appointments
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h2" color="green">
								{numAppts}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</StyledPaper>

			<StyledPaper elevation={5}>
				<Grid container>
					<CenteredGrid item xs={4}>
						<PersonOutlineOutlinedIcon
							fontSize="large"
							sx={{ color: "blue" }}
						/>
					</CenteredGrid>
					<Grid item xs={8} container>
						<Grid item xs={12}>
							<Typography
								variant="h5"
								fontWeight="light"
								color="grey"
							>
								Total Doctors
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h2" color="blue">
								{totalDocs}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</StyledPaper>
		</Stack>
	);
}

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: "24px",
	height: "15vh",
	width: "24vw",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));

const CenteredGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));
