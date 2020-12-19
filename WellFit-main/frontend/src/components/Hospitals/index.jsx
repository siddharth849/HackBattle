import React from "react";
import axios from "axios";
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
	Button,
} from "@material-ui/core";

import useStyles from "./styles";

import HospitalCards from "./HospitalCards";

const diseases = [
	"Influenza  seasonal  injectable  preservative free",
	"Td (adult) preservative free",
	"Hep B  adult",
	"meningococcal MCV4P",
	"Hep A  adult",
	"Hep B  adolescent or pediatric",
	"Hib (PRP-OMP)",
	"rotavirus  monovalent",
	"IPV",
	"DTaP",
	"Pneumococcal conjugate PCV 13",
	"Tdap",
	"HPV  quadrivalent",
	"varicella",
	"MMR",
	"Hep A  ped/adol  2 dose",
	"zoster",
	"pneumococcal polysaccharide vaccine  23 valent",
];

export default function DialogSelect() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [diseaseIndex, setDiseaseIndex] = React.useState("");
	const [hospitalList, setHospitalList] = React.useState([]);
	const [selectedDisease, setSelectedDisease] = React.useState("");

	const handleChange = (event) => {
		setDiseaseIndex(Number(event.target.value) || "");
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		if (diseases[diseaseIndex]) {
			setSelectedDisease(diseases[diseaseIndex]);
			axios
				.post("get-hospitals-by-disease-name", {
					disease: diseases[diseaseIndex],
				})
				.then((res) => {
					let newdata = [];
					for (const da of res.data) {
						newdata.push(da);
					}

					newdata.sort(function (a, b) {
						return a.BASE_COST - b.BASE_COST;
					});
					setHospitalList(newdata);
				});
		}
		setOpen(false);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClickOpen}
					>
						Select Disease
					</Button>
					<br />
					<Typography color="secondary" variant="h5">
						{selectedDisease === "" ? "None" : selectedDisease}
					</Typography>
				</div>
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
			</div>
			<HospitalCards hospitalList={hospitalList} />
		</>
	);
}
