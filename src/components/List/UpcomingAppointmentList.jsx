import React, { Fragment } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import { getAppointments } from "../../api/session";
import { appointmentText } from "../Calendar/AppointmentCalendar";
import { Grid, ListItemButton, Skeleton, Stack } from "@mui/material";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UpcomingAppointmentList() {
	const { userId, userType } = useAuth();
	const navigate = useNavigate();

	const getApptsQuery = useQuery(
		["getAppts", userId, userType],
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

	if (getApptsQuery.data?.filter(isShowAppt).length === 0) {
		return <Typography m={3}>No appointements to show</Typography>;
	}

	return (
		<List sx={{ width: "100%" }}>
			{getApptsQuery.data
				?.filter(isShowAppt)
				.sort(
					(appt1, appt2) =>
						new Date(appt1.start_time).getTime() -
						new Date(appt2.start_time).getTime()
				)
				.slice(0, 5)
				.map((appt, idx) => (
					<Fragment key={idx}>
						<ListItemButton
							onClick={(e) =>
								navigate(`/appointments?id=${appt.session_id}`)
							}
						>
							<ListItemAvatar>
								<Avatar
									alt={appointmentText(appt, userType)}
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
										{appointmentText(appt, userType)}
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

										<AccessTime fontSize="small" />
										<Typography
											sx={{ display: "inline" }}
											component="span"
											variant="body1"
											color="text.primary"
											m="5px"
										>
											{new Date(
												appt.start_time
											).toTimeString()}
										</Typography>
									</Grid>
								}
							/>
						</ListItemButton>
						<Divider variant="inset" component="li" />
					</Fragment>
				))}
		</List>
	);
}

function isShowAppt(appt) {
	return !!appt.start_time && new Date() < new Date(appt.start_time);
}
