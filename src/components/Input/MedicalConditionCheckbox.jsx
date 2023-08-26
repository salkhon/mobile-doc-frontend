import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";

export default function MedicalConditionCheckbox({
	patientGeneralInformation: formData,
	valueAssignHandlerForField,
}) {
	function checkHandlerForCondition(condition) {
		return (e) => valueAssignHandlerForField(condition)(e.target.checked); // same condition field in parent state
	}

	return (
		<FormGroup>
			{Object.keys(conditionLabels).map((key, idx) => (
				<FormControlLabel
					label={conditionLabels[key]}
					control={
						<Checkbox
							checked={formData[key]}
							onChange={checkHandlerForCondition(key)}
							inputProps={{ "aria-label": "controlled" }}
						/>
					}
					key={idx}
				/>
			))}
		</FormGroup>
	);
}

const conditionLabels = {
	heartCondition: "Heart condition",
	diabetes: "Diabetes",
	smokingHistory: "Smoking history ",
	asthma: "Asthma",
	liverProblem: "Liver problem",
	kidneyProblem: "Kidney problem",
};
