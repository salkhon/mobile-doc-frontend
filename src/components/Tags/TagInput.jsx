import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import React from "react";

export default function TagInput({
	label,
	values,
	options = [],
	onChange,
	disabled = false,
	color = "default",
	variant = "outlined",
}) {
	return (
		<Box>
			<Autocomplete
				multiple
				fullWidth
				id="tags-filled"
				options={options}
				value={values}
				freeSolo
				renderTags={(value, getTagProps) =>
					value.map((option, idx) => (
						<Chip
							variant={variant}
							label={option}
							{...getTagProps({ idx })}
							key={idx}
							color={color}
						/>
					))
				}
				renderInput={(params, idx) => (
					<TextField
						{...params}
						variant="standard"
						label={label}
						fullWidth
						disabled={disabled}
						key={idx}
					/>
				)}
				onChange={(e, val) => onChange(val)}
			/>
		</Box>
	);
}
