import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
	useContext,
} from "react";

import "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import Axios from "axios";
import UserContext from "../../../context/UserContext";
import useStyles from "./styles";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	CircularProgress,
	Typography,
	Paper,
	Button,
} from "@material-ui/core";

const URL = "https://teachablemachine.withgoogle.com/models/QJYOZCCFV/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

let model, webcam, ctx, maxPredictions;
let globalCount = 0;

export default function Squat({ open }) {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const { userData, setUserData } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const [finalPrediction, setFinalPrediction] = useState("");
	const [caloriesBurned, setCaloriesBurned] = useState(0);
	const [count, setCount] = useState(0);
	const classes = useStyles();

	const predict = useCallback(async () => {
		const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
		const prediction = await model.predict(posenetOutput);

		for (let i = 0; i < maxPredictions; i++) {
			if (prediction[i].probability > 0.7) {
				setFinalPrediction(prediction[i].className);
			}
		}

		drawPose(pose);
	}, []);

	const loop = useCallback(
		async (timestamp) => {
			webcam.update();
			await predict();
			window.requestAnimationFrame(loop);
		},
		[predict]
	);

	function drawPose(pose) {
		if (webcam.canvas) {
			ctx.drawImage(webcam.canvas, 0, 0);
			if (pose) {
				const minPartConfidence = 0.5;
				tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
				tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
			}
		}
	}

	const init = React.useCallback(async () => {
		setIsLoading(true);
		try {
			model = await tmPose.load(modelURL, metadataURL);
			maxPredictions = model.getTotalClasses();
			let size = 400;

			if (containerRef.current && window.innerHeight) {
				size = Math.min(containerRef.current.offsetWidth, window.innerHeight);
				size -= 100;
			}
			size = 450;
			const flip = true;
			webcam = new tmPose.Webcam(size, size, flip);

			await webcam.setup();
			await webcam.play();

			window.requestAnimationFrame(loop);

			const canvas = canvasRef.current;
			canvas.width = size;
			canvas.height = size;
			ctx = canvas.getContext("2d");
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [loop]);

	useEffect(() => {
		if (finalPrediction === "squat") {
			globalCount += 1;
			setCount(globalCount);
		}
	}, [finalPrediction]);

	useEffect(() => {
		setCaloriesBurned(globalCount);
	}, [count]);

	useEffect(() => {
		navigator.getMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

		navigator.getMedia(
			{ video: true },
			() => {
				if (open) init();
			},
			() => {
				if (open) alert("You dont have a webcam");
			}
		);

		if (!open) {
			return () => {
				if (webcam) webcam.stop();
			};
		}
	}, [open, init]);

	const handleCaloriPointModify = () => {
		Axios.post(`post-modify-patient-calori-point-by-id/${userData.user._id}`, {
			calori: caloriesBurned,
			point: parseInt(caloriesBurned * 0.5),
		});

		let newUser = userData;
		newUser.user.POINTS += parseInt(caloriesBurned * 0.5);
		newUser.user.CALORIE += caloriesBurned;

		setUserData({
			token: newUser.token,
			user: newUser.user,
		});
	};

	return (
		<div id="gg-container" style={{ width: "100%" }}>
			<Dialog
				open={isLoading}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Setting up Ex"}</DialogTitle>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>

			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Paper
							ref={containerRef}
							className={classes.paper}
							style={{ height: 500 }}
						>
							<canvas ref={canvasRef} id="canvas" />
						</Paper>
					</Grid>
					<Grid className={classes.sideButtons} item xs={12} md={6}>
						<Paper className={classes.paper}>
							<Typography>Position: {finalPrediction}</Typography>
							<Typography>Calories Burned:{caloriesBurned}</Typography>
							<Typography>
								Points Gained:{parseInt(caloriesBurned * 0.5)}
							</Typography>
						</Paper>
						<Paper className={classes.paper}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleCaloriPointModify}
							>
								Save progress
							</Button>
							<Button
								color="secondary"
								variant="contained"
								onClick={handleCaloriPointModify}
							>
								End
							</Button>
							<Button
								color="default"
								variant="contained"
								onClick={() => {
									setCaloriesBurned(0);
									setCount(0);
									setFinalPrediction("");
									globalCount = 0;
								}}
							>
								Reset
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
