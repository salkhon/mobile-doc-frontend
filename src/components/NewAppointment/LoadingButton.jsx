import { Button, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

export function LoadingButton({ children, isLoading, onClick }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={onClick}
			disabled={isLoading}
		>
			{isLoading ? (
				<CircularProgress
					size={20}
					sx={{
						color: colors.greenAccent[300],
					}}
				></CircularProgress>
			) : (
				children
			)}
		</Button>
	);
}
