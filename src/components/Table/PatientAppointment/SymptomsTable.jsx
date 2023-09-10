import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

export default function SymptomsTable({ symptoms }) {
	symptoms =
		symptoms?.map((d) => ({
			...d,
			id: randomId(),
		})) ?? [];

	return <DataGrid rows={symptoms} columns={symptomCols} />;
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
