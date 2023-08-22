import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function LoadingBackdrop() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Backdrop
			sx={{
				color: colors.greenAccent[500],
			}}
			open={true}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
