import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const styles = {
	cell: {
		fontSize: "17px", // Adjust the font size as needed
	},
};

export default function SymptomsDurationTable({ rows }) {
	return (
		<TableContainer
			component={Paper}
			sx={{
				margin: "20px 0px",
				maxWidth: "70%",
				backgroundColor: "rgba(0, 0, 0, 0.6)",
			}}
		>
			<Table sx={{ width: "100%" }}>
				<TableHead>
					<TableRow>
						<TableCell style={styles.cell}>Symptom</TableCell>
						<TableCell align="right" style={styles.cell}>
							Duration (days)
						</TableCell>
						<TableCell align="right" style={styles.cell}>
							Added By
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.symptom}>
							<TableCell
								component="th"
								scope="row"
								style={styles.cell}
							>
								{row.symptom_name}
							</TableCell>
							<TableCell align="right" style={styles.cell}>
								{row.duration}
							</TableCell>
							<TableCell align="right" style={styles.cell}>
								{row.added_by}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
