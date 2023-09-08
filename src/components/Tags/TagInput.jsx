import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import React from "react";

export default function TagInput({
	label,
	values,
	options = [],
	onChange,
	disabled = false,
}) {
	return (
		<Box>
			<Autocomplete
				multiple
				id="tags-filled"
				disabled={disabled}
				options={options}
				value={values}
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
				renderInput={(params, idx) => (
					<TextField
						{...params}
						variant="standard"
						label={label}
						fullWidth
						sx={{
							m: 1,
						}}
						key={idx}
					/>
				)}
				onChange={(e, val) => onChange(val)}
			/>
		</Box>
	);
}
