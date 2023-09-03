import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import {
	Avatar,
	Divider,
	Grid,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { appointmentText } from "../Calendar/AppointmentCalendar";
import { CalendarToday } from "@mui/icons-material";
import { getAppointments } from "../../api/session";
import { useNavigate } from "react-router-dom";

export default function PastAdvicesList() {
	const { userId } = useAuth();
	const navigate = useNavigate();
	const getApptsQuery = useQuery(
		["getAppts", userId, "patient"],
		getAppointments,
		{
			refetchOnWindowFocus: false,
			staleTime: 60e3,
		}
	);

	if (getApptsQuery.isFetching) {
		return (
			<Stack spacing={2} m="5px">
				<Skeleton variant="rounded" width="90%" height="80px" />
				<Skeleton variant="rounded" width="90%" height="80px" />
				<Skeleton variant="rounded" width="90%" height="80px" />
			</Stack>
		);
	}

	console.log("advice data", getApptsQuery.data);

	return (
		<List sx={{ width: "100%" }}>
			{getApptsQuery?.data
				?.filter(isShowApptAdvice)
				.sort(
					(appt1, appt2) =>
						new Date(appt2.start_time).getTime() -
						new Date(appt1.start_time).getTime()
				)
				.slice(0, 5) // todo: pagination
				.map((appt, idx) => (
					<Fragment key={idx}>
						<ListItemButton
							onClick={(e) =>
								navigate(`/appointments?id=${appt.session_id}`)
							}
						>
							<Grid
								item
								xs={5}
								display="flex"
								alignItems="center"
							>
								<ListItemAvatar>
									<Avatar
										alt={appointmentText(appt, "patient")}
										src="#"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography
											sx={{ display: "inline" }}
											component="span"
											variant="h5"
											color="text.primary"
											m="5px"
										>
											{appointmentText(appt, "patient")}
										</Typography>
									}
									secondary={
										<Grid
											item
											xs={12}
											display="flex"
											alignItems="center"
										>
											<CalendarToday fontSize="small" />
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body1"
												color="text.primary"
												m="5px"
											>
												{new Date(
													appt.start_time
												).toDateString()}
											</Typography>
										</Grid>
									}
								/>
							</Grid>

							<Grid
								item
								xs={7}
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<Typography variant="h5">
									{appt.advice}
								</Typography>
							</Grid>
						</ListItemButton>
						<Divider variant="inset" component="li" />
					</Fragment>
				))}
		</List>
	);
}

function isShowApptAdvice(appt) {
	// advice exists, and appt time was in the past
	return (
		!!appt.advice &&
		!!appt.start_time &&
		new Date(appt.start_time) < new Date()
	);
}
