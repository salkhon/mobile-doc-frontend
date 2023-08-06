import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function SymptomTags({ setSymptoms }) {
	const handleTagInputChange = (event, value) => {
		setSymptoms(value);
	};

	return (
		<Stack spacing={3} sx={{ width: 500 }}>
			<Autocomplete
				multiple
				freeSolo
				options={symptoms}
				getOptionLabel={(option) => option}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Symptoms"
						placeholder="Symptoms"
					/>
				)}
				onChange={handleTagInputChange}
			/>
		</Stack>
	);
}

const symptoms = [
	"Fever",
	"Cough",
	"Shortness of breath",
	"Fatigue",
	"Headache",
	"Muscle aches",
	"Sore throat",
	"Loss of taste or smell",
	"Nausea or vomiting",
	"Diarrhea",
];
