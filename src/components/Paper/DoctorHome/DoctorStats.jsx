import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/auth";
import { getDoctor } from "../../../api/doctor";
import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { getAppointments } from "../../../api/session";

export default function DoctorStats() {
	const { userId } = useAuth();
	const getDoctorQuery = useQuery(["getDoctor", userId], getDoctor);
	const getApptsQuery = useQuery(
		["getAppts", userId, "doctor"],
		getAppointments
	);

	const totalPatients = useMemo(
		() =>
			getApptsQuery.data?.reduce(
				(res, appt) => res.add(appt.patient_id),
				new Set()
			).size ?? 0,
		[getApptsQuery.data]
	);
	const weeklyAppts = useMemo(
		() =>
			getDoctorQuery.data?.doctor?.availability?.reduce(
				(res, weekday) => (res += weekday.day_start_times.length),
				0
			) ?? 0,
		[getDoctorQuery.data]
	);

	if (getDoctorQuery.isFetching || getApptsQuery.isFetching) {
		return (
			<Stack direction="row" pb={5} spacing={3}>
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
			</Stack>
		);
	}

	console.log("doctor stats", getDoctorQuery.data, getApptsQuery.data);
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
								{getApptsQuery.data.length}
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
								Total Patients
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h2" color="blue">
								{totalPatients}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</StyledPaper>

			<StyledPaper elevation={5}>
				<Grid container>
					<CenteredGrid item xs={4}>
						<ScheduleOutlinedIcon
							fontSize="large"
							sx={{ color: "rebeccapurple" }}
						/>
					</CenteredGrid>
					<Grid item xs={8} container>
						<Grid item xs={12}>
							<Typography
								variant="h5"
								fontWeight="light"
								color="grey"
							>
								Weekly Appointments
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h2" color="rebeccapurple">
								{weeklyAppts}
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
