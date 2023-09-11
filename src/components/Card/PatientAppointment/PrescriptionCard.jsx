import {
	Button,
	Card,
	Grid,
	TextareaAutosize,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import SymptomsTable from "../../Table/PatientAppointment/SymptomsTable";
import TagInput from "../../Tags/TagInput";
import { tokens } from "../../../theme";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrescriptionPDF from "../../PrescriptionPDF/PrescriptionPDF";

export default function PresciptionCard({ patient, doctor, appt }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	console.log("in prescription card", appt, patient, doctor);
	return (
		<Card>
			<Grid
				container
				height="100%"
				display="flex"
				justifyContent="space-between"
				p={5}
			>
				<Grid
					item
					xs={12}
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h3">Prescription</Typography>
					<Button variant="contained">
						<PDFDownloadLink
							document={
								<PrescriptionPDF
									patient={patient}
									doctor={doctor}
									appt={appt}
								/>
							}
							fileName={`${appt.session_id}.pdf`}
						>
							{({ blob, url, loading, error }) =>
								loading
									? "Loading Prescription..."
									: "Download Prescription"
							}
						</PDFDownloadLink>
					</Button>
				</Grid>
				<Grid item xs={6} height="40vh" mt={5}>
					{/* SYMTOMS TABLE */}
					<SymptomsTable symptoms={appt.symptom_list} />
				</Grid>
				<Grid item xs={5} container alignItems="center" p={3}>
					<Grid item xs={12} alignItems="center" p={1}>
						{/* DIAGNOSIS */}
						<TagInput
							label="Diagnosis"
							values={appt.diagnosis?.split(",") ?? []}
							onChange={() => {}}
							disabled={true}
							variant="filled"
							color="info"
						/>
					</Grid>
					<Grid item xs={12} alignItems="center" p={1}>
						{/* SUGGESTED TESTS */}
						<TagInput
							label="Suggested Tests"
							values={appt.suggested_test_list}
							onChange={() => {}}
							disabled={true}
						/>
					</Grid>
					<Grid item xs={12} alignItems="center" p={1}>
						{/* SUGGESTED MEDICINE */}
						<TagInput
							label="Suggested Medicine"
							values={appt.suggested_medicine_list}
							onChange={() => {}}
							disabled={true}
							color="info"
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} alignItems="center" height="30%">
					{/* ADVICE */}
					<TextareaAutosize
						placeholder="Advice for patient"
						value={appt.advice ?? ""}
						contentEditable={false}
						style={{
							fontFamily: "Source Sans Pro",
							lineHeight: "1.5",
							padding: "12px",
							marginTop: "12px",
							borderRadius: "12px 12px 0 12px",
							border: `1px solid ${colors.primary[600]}`,
							backgroundColor: `${theme.palette.neutral.dark}`,
							color: `${theme.palette.neutral.light}`,
							boxShadow: `0 2px 10px ${colors.primary[600]}`,
							width: "50%",
							height: "100%",
						}}
					/>
				</Grid>
			</Grid>
		</Card>
	);
}
