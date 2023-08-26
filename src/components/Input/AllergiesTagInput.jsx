import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import React from "react";

export default function AllergiesTagInput({ patientAllergies, onChange }) {
	return (
		<Box>
			<Autocomplete
				multiple
				id="tags-filled"
				options={[]}
				value={patientAllergies}
				freeSolo
				renderTags={(value, getTagProps) =>
					value.map((option, idx) => (
						<Chip
							variant="outlined"
							label={option}
							{...getTagProps({ idx })}
							key={idx}
						/>
					))
				}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						label="Allergies"
						fullWidth
						sx={{
							m: 1,
						}}
					/>
				)}
				onChange={(e, val) => onChange(val)}
			/>
		</Box>
	);
}
