import {
	Box,
	Button,
	Collapse,
	Grid,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import {
	Sidebar,
	Menu,
	MenuItem,
	sidebarClasses,
	menuClasses,
} from "react-pro-sidebar";
import { tokens } from "../../theme";
import {
	CalendarTodayOutlined,
	HomeOutlined,
	LocalHospital,
	MenuOutlined,
	PendingActionsOutlined,
	AnalyticsOutlined,
} from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useSelectedRoute } from "../../hooks/sidebarRouteSelection";

const sideBarOpacity = "50";

function AppSidebar(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { userName, userType } = useAuth();

	const [isCollapsed, setIsCollapsed] = useState(false);
	const selectedMenu = useSelectedRoute();
	console.log("selectedRoute", selectedMenu);

	const navigate = useNavigate();

	return (
		<Sidebar
			collapsed={isCollapsed}
			transitionDuration={300}
			width="12vw"
			rootStyles={{
				position: "relative",
				[`.${sidebarClasses.container}`]: {
					background: "transparent",
					backgroundColor: `${colors.grey[800]}${sideBarOpacity} !important`,
					height: "100vh",
				},
				[`.${menuClasses.icon}`]: {
					background: "transparent",
				},
				[`.${menuClasses.button}`]: {
					":hover": {
						backgroundColor: `${colors.grey[500]}${sideBarOpacity} !important`,
						borderRadius: 7,
					},
				},
			}}
		>
			<Menu>
				{/** LOGO AND MENU ICON */}
				<MenuItem
					onClick={() => setIsCollapsed(!isCollapsed)}
					icon={isCollapsed ? <MenuOutlined /> : undefined}
					style={{
						height: "7vh",
						alignItems: "center",
					}}
				>
					{!isCollapsed && (
						<Box
							display="flex"
							justifyContent="space-evenly"
							alignItems="center"
							pl="7px"
						>
							<Box
								component="img"
								sx={{
									height: 40,
									width: 40,
								}}
								alt="pokedoc logo"
								src="./pokedoc-logo.png"
							/>
							<Typography
								variant="h4"
								color={colors.primary[400]}
								fontFamily="Pokemon Solid"
								margin="10px"
							>
								PokéDoc
							</Typography>
							<IconButton
								onClick={() => setIsCollapsed(!isCollapsed)}
							>
								<MenuOutlined />
							</IconButton>
						</Box>
					)}
				</MenuItem>

				{/** MENU ITEMS */}
				<Box
					// paddingLeft="1%"
					paddingTop={5}
					display="flex"
					flexDirection="column"
					justifyContent="center"
					height="70vh"
				>
					{userType === "patient" && (
						<Box display="flex" margin="10px 0px 20px 0px">
							<Button
								variant="contained"
								color="secondary"
								fullWidth
								onClick={() => navigate("/newsession")}
							>
								<AddOutlinedIcon />
								{!isCollapsed && (
									<Collapse
										in={!isCollapsed}
										orientation="horizontal"
										collapsedSize={120}
									>
										<Typography variant="h6">
											New Appointment
										</Typography>
									</Collapse>
								)}
							</Button>
						</Box>
					)}
					<MItem
						title="Home"
						to="/"
						icon={<HomeOutlined />}
						selected={selectedMenu}
					/>
					<MItem
						title="Appointments"
						to="/appointments"
						icon={<PendingActionsOutlined />}
						selected={selectedMenu}
					/>
					<MItem
						title="Calendar"
						to="/calendar"
						icon={<CalendarTodayOutlined />}
						selected={selectedMenu}
					/>
					{/* DOCTOS CAN SEE THEIR PATIENTS, PATIENTS CAN SEE THEIR DOCTORS */}
					{userType === "doctor" ? (
						<>
							<MItem
								title="Patients"
								to="/patients"
								icon={<LocalHospital />}
								selected={selectedMenu}
							/>
							<MItem
								title="Analytics"
								to="/analytics"
								icon={<AnalyticsOutlined />}
								selected={selectedMenu}
							/>
						</>
					) : (
						<MItem
							title="Doctors"
							to="/doctors"
							icon={<LocalHospital />}
							selected={selectedMenu}
						/>
					)}
				</Box>

				<Box
					display="flex"
					flexDirection="column-reverse"
					height="23vh"
				>
					{/** USER */}
					<Link
						to="/profile"
						style={{
							textDecoration: "none",
						}}
					>
						<Box
							display="flex"
							margin="15px 0"
							padding="0 15px"
							sx={{
								":hover": {
									backgroundColor: `${colors.grey[500]}${sideBarOpacity} !important`,
									borderRadius: 2,
								},
							}}
						>
							<img
								alt="profile-user"
								width="50px"
								height="50px"
								src={`../../assets/user.png`}
								style={{
									cursor: "pointer",
									borderRadius: "50%",
								}}
							/>
							{!isCollapsed && (
								<Grid
									container
									style={{
										cursor: "pointer",
									}}
								>
									<Grid
										item
										container
										xs={12}
										style={{
											marginLeft: "10px",
										}}
									>
										<Typography
											variant="h3"
											color={colors.grey[100]}
										>
											{userName}
										</Typography>
									</Grid>
									<Grid
										item
										container
										xs={12}
										style={{
											marginLeft: "10px",
										}}
									>
										<Typography
											variant="h5"
											color={colors.grey[200]}
										>
											{userType}
										</Typography>
									</Grid>
								</Grid>
							)}
						</Box>
					</Link>
				</Box>
			</Menu>
		</Sidebar>
	);
}

function MItem(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={props.selected === props.title}
			style={{
				color:
					props.selected === props.title
						? colors.primary[400]
						: colors.grey[100],
			}}
			icon={props.icon}
			component={<Link to={props.to} />}
		>
			<Typography variant="h5">{props.title}</Typography>
		</MenuItem>
	);
}

export default AppSidebar;
