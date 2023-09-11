import React, { useState } from "react";
import {
	Box,
	IconButton,
	InputBase,
	Popover,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useContext } from "react";
import { tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined.js";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined.js";
import SearchIcon from "@mui/icons-material/Search.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../contexts/ColorModeAndThemeContext/index.jsx";
import { useAuth } from "../../hooks/auth";
import { useQuery } from "react-query";
import { getNotifications } from "../../api/auth";

const opacity = "50";
function Topbar() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorModeCtx = useContext(ColorModeContext);

	const { userId, setToken } = useAuth();

	const getNotificationsQuery = useQuery(
		["getNotifications", userId],
		getNotifications,
		{
			staleTime: 5e3,
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchIntervalInBackground: true,
		}
	);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const navigate = useNavigate();

	return (
		// like div, but allows convenient css
		<Box display="flex" justifyContent="space-between" margin="20px">
			{/** SEARCH BAR */}
			<Box
				display="flex"
				bgcolor={`${colors.primary[300]}${opacity}`}
				borderRadius="3px"
			>
				<InputBase
					sx={{ marginLeft: 2, flex: 1 }}
					placeholder="Search"
				/>
				<IconButton type="button" sx={{ padding: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			{/** ICONS */}
			<Box display="flex">
				<IconButton href="/">
					<HomeOutlinedIcon />
				</IconButton>

				<IconButton
					onClick={(event) => setAnchorEl(event.currentTarget)}
				>
					<NotificationsOutlinedIcon />
				</IconButton>

				<Popover
					open={open}
					id={id}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					onClose={() => setAnchorEl(null)}
				>
					<Stack
						direction="column"
						sx={{ p: 1, height: 300, width: 300, overflow: "auto" }}
					>
						{getNotificationsQuery.data?.notifications
							?.sort(
								(n1, n2) =>
									new Date(n2.timestamp).getTime() -
									new Date(n1.timestamp).getTime()
							)
							.map((n, idx) => (
								<Box key={idx} display="flex">
									<Typography
										variant="h5"
										key={idx}
										sx={{
											p: 2,
											"&:hover": {
												bgcolor: colors.grey[900],
											},
										}}
									>
										{n.session_id ? (
											<Link
												to={`/appointments?id=${n.session_id}`}
												style={{
													textDecoration: "none",
													color: colors.grey[100],
												}}
											>
												{n.message}
											</Link>
										) : (
											n.message
										)}
									</Typography>
									<Typography sx={{ p: 2 }}>
										{Math.floor(
											(new Date() -
												new Date(n.timestamp)) /
												60e3
										)}{" "}
										minutes ago
									</Typography>
								</Box>
							))}
					</Stack>
				</Popover>

				<IconButton onClick={colorModeCtx.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
						<LightModeOutlinedIcon />
					) : (
						<DarkModeOutlinedIcon />
					)}
				</IconButton>

				<IconButton
					onClick={() => {
						setToken(null);
						navigate("/", { replace: true });
					}}
				>
					<LogoutOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

export default Topbar;
