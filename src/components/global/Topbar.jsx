import React from "react";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme.js";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined.js";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined.js";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined.js";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined.js";
import SearchIcon from "@mui/icons-material/Search.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../LoginPage/UserContext.jsx";

function Topbar() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorModeCtx = useContext(ColorModeContext);
	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	return (
		// like div, but allows convenient css
		<Box display="flex" justifyContent="space-between" margin="20px">
			{/** SEARCH BAR */}
			<Box
				display="flex"
				bgcolor={colors.primary[400]}
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
				<IconButton onClick={colorModeCtx.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
						<LightModeOutlinedIcon />
					) : (
						<DarkModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>

				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>

				<IconButton>
					<PersonOutlinedIcon />
				</IconButton>

				<IconButton
					onClick={() => {
						localStorage.removeItem("pokedoc_token");
						setUser(null);
						navigate("/");
					}}
				>
					<LogoutOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

export default Topbar;
