import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
	Alert,
	Collapse,
	Grid,
	Skeleton,
	TextareaAutosize,
	useTheme,
} from "@mui/material";
import SymptomsTable from "../../Table/DoctorAppointment/SymtomsTable";
import TagInput from "../../Tags/TagInput";
import { useAuth } from "../../../hooks/auth";
import { tokens } from "../../../theme";
import AppointmentsTable from "../../Table/AppointmentsTable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllMeds, putPrescription } from "../../../api/session";
import { LoadingButton } from "@mui/lab";

export default function AppointmentTabs({ appt, patientEHR }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { userType } = useAuth();
	const queryClient = useQueryClient();

	// tab index
	const [value, setValue] = useState("1");

	// temporary store modification before PUTing to server todo: put these temp values into the children component
	const [prescription, setPrescription] = useState({
		diagnosis: appt.diagnosis?.split(",") ?? [],
		advice: appt.advice ?? "",
		suggested_test_list: appt.suggested_test_list ?? [],
		suggested_medicine_list: appt.suggested_medicine_list ?? [],
	});

	// if input medicines have side effects for patient
	const [isMedicineConflict, setIsMedicineConflict] = useState(false);

	// get med list
	const getAllMedicinesQuery = useQuery(["getAllMeds"], getAllMeds, {
		refetchOnWindowFocus: false,
	});

	// update prescription
	const putPrescriptionMutation = useMutation(putPrescription, {
		onMutate: async ({ apptId, prescription }) => {
			await queryClient.cancelQueries(["getAppt", appt.session_id]);
			queryClient.setQueryData(["getAppt", appt.session_id], {
				...appt,
				diagnosis: prescription.diagnosis,
				advice: prescription.advice,
				suggested_test_list: prescription.suggested_test_list,
				suggested_medicine_list: prescription.suggested_medicine_list,
			});
		},
	});

	// handle tab change
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// handle prescripion input
	function prescriptionInputHandlerFor(field) {
		return (val) => {
			setPrescription((oldVal) => ({
				...oldVal,
				[field]: val,
			}));
		};
	}

	// handle medicine input, check for side effects
	function handleMedicineInput(vals) {
		console.log("med input", vals);
		const med = getAllMedicinesQuery.data?.all_medicines?.find((m) =>
			vals.includes(m.name)
		);
		console.log("found meds", med);

		if (!!med && isMedsConflict(med, patientEHR)) {
			setIsMedicineConflict(true);
		} else {
			setIsMedicineConflict(false);
		}

		setPrescription((oldVal) => ({
			...oldVal,
			suggested_medicine_list: vals,
		}));
	}

	// update request for prescription
	function handleSavePrescription() {
		putPrescriptionMutation.mutate({
			apptId: appt.session_id,
			prescription: {
				...prescription,
				diagnosis: prescription.diagnosis.join(","),
			},
		});
	}

	return (
		<Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange}>
						<Tab label="Prescription" value="1" />
						<Tab label="Patient History" value="2" />
						<Tab label="Item Three" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1" sx={{ height: "94%" }}>
					<Grid container spacing={1} height="100%">
						<Grid item xs={6} height="40vh" mt={5}>
							{/* SYMTOMS TABLE */}
							<SymptomsTable symptoms={appt.symptom_list} />
						</Grid>
						<Grid
							item
							xs={6}
							container
							spacing={2}
							alignItems="center"
						>
							<Grid item xs={12} justifyContent="center">
								{/* DIAGNOSIS */}
								<TagInput
									label="Diagnosis"
									values={prescription.diagnosis}
									options={diseases}
									onChange={prescriptionInputHandlerFor(
										"diagnosis"
									)}
									disabled={userType !== "doctor"}
								/>
							</Grid>
							<Grid item xs={12}>
								{/* SUGGESTED TESTS */}
								<TagInput
									label="Suggested Tests"
									values={prescription.suggested_test_list}
									options={medicalTests}
									onChange={prescriptionInputHandlerFor(
										"suggested_test_list"
									)}
									disabled={userType !== "doctor"}
								/>
							</Grid>
							<Grid item xs={12}>
								{/* SUGGESTED MEDICINE */}
								{getAllMedicinesQuery.isFetching ? (
									<Skeleton variant="rectangular" />
								) : (
									<>
										<TagInput
											label="Suggested Medicine"
											values={
												prescription.suggested_medicine_list
											}
											options={getAllMedicinesQuery.data?.all_medicines?.map(
												(med) => med.name
											)}
											onChange={handleMedicineInput}
											disabled={userType !== "doctor"}
										/>
										<Collapse in={isMedicineConflict}>
											<Alert severity="warning">
												Prescription may have
												side-effects for patient!
											</Alert>
										</Collapse>
									</>
								)}
							</Grid>
						</Grid>
						<Grid item xs={12} alignItems="center" height="30%">
							{/* ADVICE */}
							<TextareaAutosize
								placeholder="Advice for patient"
								value={prescription.advice ?? ""}
								onChange={(e) =>
									prescriptionInputHandlerFor("advice")(
										e.target.value
									)
								}
								style={{
									fontFamily: "Source Sans Pro",
									lineHeight: "1.5",
									padding: "12px",
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
						<Grid item xs={12}>
							<LoadingButton
								variant="contained"
								loading={putPrescriptionMutation.isLoading}
								onClick={handleSavePrescription}
							>
								Save
							</LoadingButton>
						</Grid>
					</Grid>
				</TabPanel>
				<TabPanel
					value="2"
					sx={{
						height: "94%",
					}}
				>
					<Grid container height="100%">
						<AppointmentsTable patientEHR={patientEHR} />
					</Grid>
				</TabPanel>
				<TabPanel value="3">Test Results</TabPanel>
			</TabContext>
		</Box>
	);
}

const diseases = [
	"cold",
	"flu",
	"strep throat",
	"ear infection",
	"sinus infection",
	"bronchitis",
	"pneumonia",
	"mononucleosis",
	"HIV/AIDS",
	"hepatitis",
	"lyme disease",
	"zika virus",
	"breast cancer",
	"lung cancer",
	"colorectal cancer",
	"prostate cancer",
	"skin cancer",
	"leukemia",
	"lymphoma",
	"brain cancer",
	"thyroid cancer",
	"kidney cancer",
	"ovarian cancer",
	"heart attack",
	"stroke",
	"hypertension",
	"heart failure",
	"arrhythmia",
	"angina",
	"peripheral artery disease",
	"deep vein thrombosis",
	"varicose veins",
	"asthma",
	"copd",
	"emphysema",
	"tuberculosis",
	"sarcoidosis",
	"cystic fibrosis",
	"sleep apnea",
	"gastritis",
	"ulcers",
	"diarrhea",
	"constipation",
	"irritable bowel syndrome",
	"celiac disease",
	"crohn's disease",
	"ulcerative colitis",
	"appendicitis",
	"gallbladder disease",
	"liver disease",
	"kidney disease",
	"alzheimer's disease",
	"parkinson's disease",
	"multiple sclerosis",
	"epilepsy",
	"headache",
	"migraines",
	"carpal tunnel syndrome",
	"sciatica",
	"shingles",
	"depression",
	"anxiety",
	"bipolar disorder",
	"schizophrenia",
	"eating disorders",
	"post-traumatic stress disorder (ptsd)",
	"attention deficit hyperactivity disorder (adhd)",
	"autism spectrum disorder (asd)",
	"diabetes",
	"rheumatoid arthritis",
	"lupus",
	"osteoarthritis",
	"gout",
	"anemia",
	"thyroid problems",
	"allergies",
	"hay fever",
	"psoriasis",
	"eczema",
];

const medicalTests = [
	"Complete Blood Count (CBC)",
	"Blood Glucose Test (Fasting and Postprandial)",
	"Lipid Profile (Cholesterol, Triglycerides)",
	"Liver Function Tests (LFTs)",
	"Kidney Function Tests (eGFR, Creatinine)",
	"Thyroid Function Tests (TSH, T3, T4)",
	"Hemoglobin A1c (HbA1c) Test",
	"Urinalysis",
	"Electrocardiogram (ECG or EKG)",
	"Chest X-ray",
	"Blood Pressure Measurement",
	"Body Mass Index (BMI) Assessment",
	"Bone Density Scan (DEXA)",
	"Complete Metabolic Panel (CMP)",
	"Prostate-Specific Antigen (PSA) Test",
	"Mammogram",
	"Pap Smear (Cervical Cancer Screening)",
	"Colonoscopy (Colorectal Cancer Screening)",
	"Ophthalmic Examination (Eye Test)",
	"Hearing Test (Audiometry)",
	"Spirometry (Lung Function Test)",
	"Allergy Testing (Skin Prick Test)",
	"Electroencephalogram (EEG)",
	"Magnetic Resonance Imaging (MRI)",
	"Computed Tomography (CT) Scan",
	"Ultrasound (Sonography)",
	"Bone X-ray (Radiography)",
	"H. pylori Test (Stomach Infection)",
	"Stool Occult Blood Test (Fecal Occult Blood Test)",
	"Sleep Study (Polysomnography)",
	"Cardiac Stress Test (Exercise ECG)",
	"Genetic Testing",
	"Hormone Panel",
	"Vitamin D Level Test",
	"Coagulation Profile (Clotting Factors)",
	"Arterial Blood Gas (ABG) Test",
	"Rheumatoid Factor (RF) Test",
	"Hepatitis Panel (A, B, C)",
	"HIV/AIDS Test",
	"Pregnancy Test (hCG)",
	"C-reactive Protein (CRP) Test",
	"D-dimer Test (Clotting Disorder)",
	"Autoimmune Antibody Tests",
	"Carotid Ultrasound (Stroke Risk Assessment)",
	"Skin Biopsy",
	"Biopsy of Organs (e.g., Liver, Kidney)",
	"Electrolyte Panel",
	"Hb Electrophoresis (Sickle Cell Anemia)",
	"Saliva or Breath Alcohol Test",
	"Toxicology Screening (Drug Test)",
];

function isMedsConflict(med, patientEHR) {
	console.log("checking", med, " in ", patientEHR);
	return med.precautions?.some(
		(prec) => !!patientEHR.patient_details?.general_information[prec]
	);
}
