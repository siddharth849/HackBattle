import React, { useEffect, useState, useContext } from "react";
import {
	Container,
	IconButton,
	Paper,
	Typography,
	InputBase,
	FormGroup,
	FormHelperText,
	Checkbox,
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";
import { InsertEmoticon, Send, Mic, MicOff } from "@material-ui/icons";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import "./Chat.css";

import Axios from "axios";
import UserContext from "../../context/UserContext";

const URL = "https://diagonosisapi.herokuapp.com/";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	formControl: {
		margin: theme.spacing(3),
	},
}));

const Chat = () => {
	const classes = useStyles();
	const { userData } = useContext(UserContext);
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [isListening, setIsListening] = useState(false);
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([
		{
			msg: `Hello ${
				userData.user && userData.user.FIRST
			}, Please tell me what symptoms do u have ?`,
			isUser: false,
			diseaseVersions: null,
			sideStmptomList: null,
			finalResult: null,
		},
	]);
	const [currentStep, setCurrentStep] = useState("step1");
	const [diseaseVersion, setDiseaseVersion] = useState("");
	const [sideStmptoms, setSideSymptoms] = useState({});
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		setSideSymptoms({
			...sideStmptoms,
			[event.target.name]: event.target.checked ? "yes" : "no",
		});
	};

	const step1 = () => {
		let newMessageList = [];
		for (const msg of messageList) {
			newMessageList.push(msg);
		}

		Axios.post(URL + "verify-symptom-name", {
			name: message,
		}).then((res) => {
			if (res.data.value === 1) {
				newMessageList.push({
					msg: message,
					isUser: true,
					diseaseVersions: null,
					sideStmptomList: null,
					finalResult: null,
				});
				newMessageList.push({
					msg: "Okay. From how many days ?",
					isUser: false,
					diseaseVersions: null,
					sideStmptomList: null,
					finalResult: null,
				});
				setMessageList(newMessageList);
				setCurrentStep("step2");
			}
		});
	};

	const step2 = () => {
		let newMessageList = [];
		for (const msg of messageList) {
			newMessageList.push(msg);
		}

		Axios.post(URL + "verify-symptom-days", {
			day: message,
		}).then((res) => {
			newMessageList.push({
				msg: message,
				isUser: true,
				diseaseVersions: null,
				sideStmptomList: null,
				finalResult: null,
			});
			setMessageList(newMessageList);
			setCurrentStep("step3");
		});
	};

	const step3 = () => {
		Axios.get(URL + "get-symptom-version").then((res) => {
			let versionLis = [];
			let newMessageList = [];
			for (const msg of messageList) {
				newMessageList.push(msg);
			}
			for (const ver of res.data.versions) {
				versionLis.push(ver);
			}

			newMessageList.push({
				msg: "Select the one you meant ?",
				isUser: false,
				diseaseVersions: versionLis,
				sideStmptomList: null,
				finalResult: null,
			});
			setMessageList(newMessageList);
			setCurrentStep("step4");
		});
	};

	const step4 = (event) => {
		setDiseaseVersion(event.target.value);
		let newMessageList = [];
		for (const msg of messageList) {
			newMessageList.push(msg);
		}

		Axios.post(URL + "set-symptom-version", {
			version: diseaseVersion,
		}).then((res) => {
			let sideStmptomList = [];

			for (const ver of res.data) {
				sideStmptomList.push(ver);
			}

			newMessageList.push({
				msg: "Are you experiencing any ?",
				isUser: false,
				diseaseVersions: null,
				sideStmptomList: sideStmptomList,
				finalResult: null,
			});
			setMessageList(newMessageList);
			setCurrentStep("step5");
		});
	};

	const step5 = () => {
		Axios.post(URL + "set-symptoms", { sideStmptoms }).then((res) => {
			let newMessageList = [];
			for (const msg of messageList) {
				newMessageList.push(msg);
			}
			console.log(res.data);
			newMessageList.push({
				msg: "Final report",
				isUser: false,
				diseaseVersions: null,
				sideStmptomList: null,
				finalResult: res.data,
			});
			setMessageList(newMessageList);
			setCurrentStep("step5");
		});
	};

	const RESET_ALL = () => {
		Axios.get(URL + "reset-all").then((res) => {
			console.log(res.data);
		});
		setMessageList([
			{
				msg: `Hello ${
					userData.user && userData.user.FIRST
				}, Please tell me what symptoms do u have ?`,
				isUser: false,
				diseaseVersions: null,
				sideStmptomList: null,
				finalResult: null,
			},
		]);
		setCurrentStep("step1");
		setMessage("");
		setDiseaseVersion("");
		setSideSymptoms({});
	};

	const sendMessage = (event) => {
		if (event) event.preventDefault();

		if (currentStep === "step1") {
			step1();
		} else if (currentStep === "step2") {
			step2();
		} else if (currentStep === "step3") {
			step3();
		} else if (currentStep === "step4") {
			step4();
		}

		setMessage("");
	};

	useEffect(() => {
		if (currentStep === "step3") {
			return step3();
		}
	}, [currentStep]);

	// useEffect(() => {
	// 	setOpen(true);
	// 	Axios.get(URL, (res) => {
	// 		// console.log(res.data);
	// 		setOpen(false);
	// 	});
	// }, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(resetTranscript);
		return null;
	}

	return (
		<div className="container">
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Loading Herouku Free tier takes Time"}
				</DialogTitle>
			</Dialog>
			<div className="chat">
				<div className="chat__body">
					{messageList.map((item, idx) => {
						return (
							<Paper
								key={idx}
								style={{
									border: `${item.isUser ? "1px solid blue" : "1px solid red"}`,
								}}
								className={`chat__message ${item.isUser && "chat__reciever"}`}
							>
								<Typography variant="body1" component="span">
									<Typography
										variant="subtitle2"
										component="span"
										className="chat__name"
									>
										{item.isUser && userData.user ? userData.user.FIRST : "Bot"}
									</Typography>
									{item.msg}
									<span className="chat__timestamp">3:26pm</span>
								</Typography>
								{item.diseaseVersions && (
									<FormControl
										className={classes.formControl}
										component="fieldset"
									>
										<FormLabel component="legend">Disease Version</FormLabel>
										<RadioGroup
											aria-label="gender"
											name="gender1"
											value={diseaseVersion}
											onChange={step4}
										>
											{item.diseaseVersions.map((item, key) => {
												return (
													<FormControlLabel
														key={key}
														value={item}
														control={<Radio />}
														label={item}
													/>
												);
											})}
										</RadioGroup>
									</FormControl>
								)}
								{item.sideStmptomList && (
									<FormControl
										component="fieldset"
										className={classes.formControl}
									>
										<FormLabel component="legend">Side Symptoms</FormLabel>
										<FormGroup>
											{item.sideStmptomList.map((item, key) => (
												<FormControlLabel
													key={key}
													control={
														<Checkbox onChange={handleChange} name={item} />
													}
													label={item}
												/>
											))}
										</FormGroup>
										<FormHelperText>
											<Button onClick={step5}>done ?</Button>
										</FormHelperText>
									</FormControl>
								)}
								{item.finalResult && (
									<FormControl className={classes.formControl}>
										<Typography variant="body1" component="span">
											You may have:
											<br />
											{item.finalResult.diseases.map((item, key) => (
												<Typography variant="body2" key={key}>
													{item}
												</Typography>
											))}
										</Typography>
										<br />
										<Typography variant="body1" component="span">
											Information:
											<br />
											{item.finalResult.information && (
												<Typography variant="body2">
													{item.finalResult.information}
												</Typography>
											)}
										</Typography>
										<br />
										<Typography variant="body1" component="span">
											Recommendatins:
											<br />
											{item.finalResult.recommendatins.map((item, key) => (
												<Typography variant="body2" key={key}>
													{item}
												</Typography>
											))}
										</Typography>
									</FormControl>
								)}
							</Paper>
						);
					})}
				</div>

				<div>
					<div style={{ display: "flex" }}>
						<IconButton
							color="secondary"
							style={{ marginLeft: "auto", marginRight: "auto" }}
							onMouseDown={() => {
								setIsListening(true);
								SpeechRecognition.startListening();
							}}
							onMouseUp={() => {
								SpeechRecognition.stopListening();
								setIsListening(false);
							}}
						>
							{!isListening ? (
								<Mic fontSize="large" />
							) : (
								<MicOff fontSize="large" />
							)}
						</IconButton>
					</div>
					<div style={{ display: "flex" }}>
						<InputBase
							disabled
							style={{ marginLeft: "auto", marginRight: "auto" }}
							placeholder="Say somthing to mic"
							type="text"
							value={transcript}
						/>
						<Button onClick={RESET_ALL}>RESET_ALL</Button>
					</div>
					<Container
						maxWidth="xl"
						style={{
							display: "flex",
							paddingTop: 0,
							paddingBottom: 0,
							paddingLeft: 10,
							paddingRight: 10,
						}}
						className="chat__footer"
					>
						<InsertEmoticon />
						<form>
							<InputBase
								style={{
									flex: 1,
									paddingTop: 0,
									paddingBottom: 0,
									paddingLeft: 10,
									paddingRight: 10,
									borderRadius: "30px",
								}}
								placeholder="Enter a msg"
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								type="text"
								value={message}
							/>

							<button onClick={sendMessage}></button>
						</form>
						<IconButton disabled={!message} onClick={sendMessage}>
							<Send />
						</IconButton>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Chat;
