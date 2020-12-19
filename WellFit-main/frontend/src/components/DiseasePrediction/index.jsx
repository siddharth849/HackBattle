import React, { useState } from "react";
import Axios from "axios";

import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {
	Select,
	Typography,
	FormControl,
	MenuItem,
	Input,
	InputLabel,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
} from "@material-ui/core";

import useStyles from "./styles";

const diseases = [
	"itching",
	"skin_rash",
	"nodal_skin_eruptions",
	"continuous_sneezing",
	"shivering",
	"chills",
	"joint_pain",
	"stomach_pain",
	"acidity",
	"ulcers_on_tongue",
	"muscle_wasting",
	"vomiting",
	"burning_micturition",
	"spotting_ urination",
	"fatigue",
	"weight_gain",
	"anxiety",
	"cold_hands_and_feets",
	"mood_swings",
	"weight_loss",
	"restlessness",
	"lethargy",
	"patches_in_throat",
	"irregular_sugar_level",
	"cough",
	"high_fever",
	"sunken_eyes",
	"breathlessness",
	"sweating",
	"dehydration",
	"indigestion",
	"headache",
	"yellowish_skin",
	"dark_urine",
	"nausea",
	"loss_of_appetite",
	"pain_behind_the_eyes",
	"back_pain",
	"constipation",
	"abdominal_pain",
	"diarrhoea",
	"mild_fever",
	"yellow_urine",
	"yellowing_of_eyes",
	"acute_liver_failure",
	"fluid_overload",
	"swelling_of_stomach",
	"swelled_lymph_nodes",
	"malaise",
	"blurred_and_distorted_vision",
	"phlegm",
	"throat_irritation",
	"redness_of_eyes",
	"sinus_pressure",
	"runny_nose",
	"congestion",
	"chest_pain",
	"weakness_in_limbs",
	"fast_heart_rate",
	"pain_during_bowel_movements",
	"pain_in_anal_region",
	"bloody_stool",
	"irritation_in_anus",
	"neck_pain",
	"dizziness",
	"cramps",
	"bruising",
	"obesity",
	"swollen_legs",
	"swollen_blood_vessels",
	"puffy_face_and_eyes",
	"enlarged_thyroid",
	"brittle_nails",
	"swollen_extremeties",
	"excessive_hunger",
	"extra_marital_contacts",
	"drying_and_tingling_lips",
	"slurred_speech",
	"knee_pain",
	"hip_joint_pain",
	"muscle_weakness",
	"stiff_neck",
	"swelling_joints",
	"movement_stiffness",
	"spinning_movements",
	"loss_of_balance",
	"unsteadiness",
	"weakness_of_one_body_side",
	"loss_of_smell",
	"bladder_discomfort",
	"foul_smell_of urine",
	"continuous_feel_of_urine",
	"passage_of_gases",
	"internal_itching",
	"toxic_look_(typhos)",
	"depression",
	"irritability",
	"muscle_pain",
	"altered_sensorium",
	"red_spots_over_body",
	"belly_pain",
	"abnormal_menstruation",
	"dischromic _patches",
	"watering_from_eyes",
	"increased_appetite",
	"polyuria",
	"family_history",
	"mucoid_sputum",
	"rusty_sputum",
	"lack_of_concentration",
	"visual_disturbances",
	"receiving_blood_transfusion",
	"receiving_unsterile_injections",
	"coma",
	"stomach_bleeding",
	"distention_of_abdomen",
	"history_of_alcohol_consumption",
	"fluid_overload",
	"blood_in_sputum",
	"prominent_veins_on_calf",
	"palpitations",
	"painful_walking",
	"pus_filled_pimples",
	"blackheads",
	"scurring",
	"skin_peeling",
	"silver_like_dusting",
	"small_dents_in_nails",
	"inflammatory_nails",
	"blister",
	"red_sore_around_nose",
	"yellow_crust_ooze",
	"prognosis",
];

export default function DiseasePrediction() {
	const classes = useStyles();

	const [symptom, setSymptom] = useState("");
	const [open, setOpen] = React.useState(false);
	const [diseaseIndex, setDiseaseIndex] = React.useState("");
	const [fetchedData, setFetchedData] = useState(null);

	const preprocess = (text) => {
		for (let t of text) {
			if (t === " ") {
				t = "_";
			}
		}

		return text;
	};

	const handleChange = (event) => {
		setDiseaseIndex(Number(event.target.value) || "");
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		if (diseases[diseaseIndex]) {
			fetchDiseaseUsingSymptom(diseases[diseaseIndex]);
		}
		setOpen(false);
	};

	const fetchDiseaseUsingSymptom = (str) => {
		let searchSTR = preprocess(str);
		console.log(searchSTR);
		Axios.get(
			`https://diagonosisapi.herokuapp.com/?
			arg1=${searchSTR}
			&arg2=None
			&arg3=None
			&arg4=None
			&arg5=None`
		).then((res) => {
			setFetchedData(res.data);
		});
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: 50,
				}}
			>
				<Paper className={classes.root}>
					<InputBase
						className={classes.input}
						placeholder="Search symptom"
						inputProps={{ "aria-label": "search symptom" }}
						onChange={(e) => setSymptom(e.target.value)}
						value={symptom}
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
						onClick={() => fetchDiseaseUsingSymptom(symptom)}
					>
						<SearchIcon />
					</IconButton>
				</Paper>
			</div>

			<>
				<div
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: 50,
						flexDirection: "column",
					}}
				>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClickOpen}
					>
						Select Disease
					</Button>
					<Dialog
						disableBackdropClick
						disableEscapeKeyDown
						open={open}
						onClose={handleClose}
					>
						<DialogTitle>Select Disease</DialogTitle>
						<DialogContent>
							<form className={classes.container}>
								<FormControl className={classes.formControl}>
									<InputLabel id="demo-dialog-select-label">Disease</InputLabel>
									<Select
										labelId="demo-dialog-select-label"
										id="demo-dialog-select"
										value={diseaseIndex}
										onChange={handleChange}
										input={<Input />}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{diseases.map((item, key) => {
											return (
												<MenuItem key={key} value={key}>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</form>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={handleClose} color="primary">
								Ok
							</Button>
						</DialogActions>
					</Dialog>

					<div style={{ padding: 50 }}>
						{fetchedData && (
							<>
								{fetchedData.symptom3 !== "None" && (
									<Typography variant="h5">
										Chances of {fetchedData.symptom3} is{" "}
										{fetchedData.probability3} %
									</Typography>
								)}
								{fetchedData.symptom2 !== "None" && (
									<Typography variant="h5">
										Chances of {fetchedData.symptom2} is{" "}
										{fetchedData.probability2} %
									</Typography>
								)}
								{fetchedData.symptom1 !== "None" && (
									<Typography variant="h5">
										Chances of {fetchedData.symptom1} is{" "}
										{fetchedData.probability1} %
									</Typography>
								)}
							</>
						)}
					</div>
				</div>
			</>
		</>
	);
}
