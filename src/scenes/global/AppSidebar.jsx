import {
	Box,
	IconButton,
	Typography,
	iconButtonClasses,
	iconClasses,
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
	BarChartOutlined,
	CalendarTodayOutlined,
	ContactsOutlined,
	HelpOutlined,
	HomeOutlined,
	MapOutlined,
	MenuOutlined,
	PeopleOutlined,
	PersonOutlined,
	PieChartOutlined,
	ReceiptOutlined,
	TimelineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function MItem(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={props.selected === props.title}
			style={{
				color: colors.grey[100],
				margin: "-3px 1px -3px 1px",
			}}
			onClick={() => props.setSelected(props.title)}
			icon={props.icon}
			component={<Link to={props.to} />}
		>
			<Typography>{props.title}</Typography>
		</MenuItem>
	);
}

function AppSidebar(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard"); // what page we are in

	return (
		<Box marginRight="20px">
			<Sidebar
				collapsed={isCollapsed}
				rootStyles={{
					[`.${sidebarClasses.container}`]: {
						background: `${colors.primary[400]}`,
                        height: "100vh"
					},
					[`.${menuClasses.icon}`]: {
						backgroundColor: "transparent",
					},
				}}
			>
				<Menu>
					{/** LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlined /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								marginLeft="15px"
							>
								<Typography
									variant="h3"
									color={colors.grey[100]}
								>
									ADMINS
								</Typography>
								<IconButton
									onClick={() => setIsCollapsed(!isCollapsed)}
								>
									<MenuOutlined />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{/** USER */}
					{!isCollapsed && (
						<Box marginBottom="25px">
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<img
									alt="profile-user"
									width="100px"
									height="100px"
									src={`../../assets/user.png`}
									style={{
										cursor: "pointer",
										borderRadius: "50%",
									}}
								/>
							</Box>

							<Box textAlign="center">
								<Typography
									variant="h3"
									color={colors.grey[100]}
									fontWeight="bold"
									style={{
										margin: "10px 0 0 0",
									}}
								>
									Salman Khondker
								</Typography>
								<Typography
									variant="h5"
									color={colors.greenAccent[500]}
								>
									Patient
								</Typography>
							</Box>
						</Box>
					)}

					{/** MENU ITEMS */}
					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						<MItem
							title="Dashboard"
							to="/"
							icon={<HomeOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Typography
							variant="h6"
							color={colors.grey[300]}
							style={{
								margin: "15px 0 5px 20px",
							}}
						>
							Data
						</Typography>
						<MItem
							title="Manage Team"
							to="/team"
							icon={<PeopleOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Contacts Information"
							to="/contacts"
							icon={<ContactsOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Invoices Balances"
							to="/invoices"
							icon={<ReceiptOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Typography
							variant="h6"
							color={colors.grey[300]}
							style={{
								margin: "15px 0 5px 20px",
							}}
						>
							Pages
						</Typography>
						<MItem
							title="Profile Form"
							to="/form"
							icon={<PersonOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Calendar"
							to="/calendar"
							icon={<CalendarTodayOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="FAQ Page"
							to="/faq"
							icon={<HelpOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Typography
							variant="h6"
							color={colors.grey[300]}
							style={{
								margin: "15px 0 5px 20px",
							}}
						>
							Charts
						</Typography>
						<MItem
							title="Bar Chart"
							to="/bar"
							icon={<BarChartOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Pie Chart"
							to="/pie"
							icon={<PieChartOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Line Chart"
							to="/line"
							icon={<TimelineOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<MItem
							title="Geography Chart"
							to="/geography"
							icon={<MapOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</Sidebar>
		</Box>
	);
}

export default AppSidebar;
