import {
	Box,
	Button,
	CircularProgress,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SymptomTags from "./SymptomTags";
import { tokens } from "../../theme";

export function SymptomsInput({ onSymptomsSubmission, isDoctorsLoading }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [symptoms, setSymptoms] = useState(null);

	return (
		<Box margin="20px">
			<Box margin="10px" display="flex">
				<Typography variant="h3">Enter Symptoms</Typography>
			</Box>
			<Box margin="10px" display="flex">
				<SymptomTags setSymptoms={setSymptoms} />
				<Box marginTop="10px" marginLeft="20px">
					<Button
						variant="contained"
						color="secondary"
						onClick={(ev) => onSymptomsSubmission(ev, symptoms)}
						disabled={isDoctorsLoading}
					>
						{isDoctorsLoading ? (
							<CircularProgress
								size={20}
								sx={{
									color: colors.greenAccent[300],
								}}
							></CircularProgress>
						) : (
							"Submit"
						)}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
