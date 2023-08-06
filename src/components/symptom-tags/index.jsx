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
	"fever",
	"cough",
	"shortness of breath",
	"fatigue",
	"headache",
	"muscle aches",
	"sore throat",
	"loss of taste or smell",
	"nausea or vomiting",
	"diarrhea",
    "nausea", 
    "chills",
];
