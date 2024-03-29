import React from "react";
import CRUDTable from "../CRUDTable";

export default function SymptomsCrudTable({ symptoms, onChange }) {
    return (
        <CRUDTable
            cols={symptomCols}
            data={symptoms}
            onChange={onChange}
            what="Symptoms"
        />
    )
}

const symptomCols = [
	{
		field: "symptom_name",
		headerName: "Symptom",
		type: "string",
		width: 150,
	},
	{
		field: "duration",
		headerName: "Duration (days)",
		type: "number",
		width: 150,
	},
];