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

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorModeCtx = useContext(ColorModeContext);

	return (
		// like div, but allows convenient css
		<Box display="flex" justifyContent="space-between" padding={2}>
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
			</Box>
		</Box>
	);
};

export default Topbar;
