import React, { useEffect, useState, useRef } from "react";

import Axios from "axios";
import { LineChart, Line, Tooltip } from "recharts";
import { Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	paperContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	graph: {
		paddingTop: 20,
		paddingBottom: 20,
	},
}));

export default function Chart({ userData }) {
	const classes = useStyles();
	const [rows, setRows] = useState([]);
	const [dBpData, setDBpData] = useState([]);
	const [sBpData, setSBpData] = useState([]);
	const chartContainerRef = useRef(null);
	const [bmiData, setBmiData] = useState([]);
	const [heartRateData, setHeartRateData] = useState([]);

	useEffect(() => {
		if (userData.user) {
			Axios.get(`get-observations-by-patient-id/${userData.user.Id}`).then(
				(res) => {
					let newRows = [];
					for (let i in res.data) {
						newRows.push(res.data[i]);
					}
					setRows(newRows);
				}
			);
		}
	}, [userData]);

	function getDate(dateObj) {
		return (
			dateObj.getDate() +
			"/" +
			dateObj.getMonth() +
			"/" +
			dateObj.getFullYear()
		).toString();
	}

	useEffect(() => {
		let newDBpData = [];
		let newBMIData = [];
		let newHeartRateData = [];
		let newSBpData = [];

		for (const row of rows) {
			if (row.DESCRIPTION === "Diastolic Blood Pressure") {
				let dateObj = new Date(row.DATE);
				newDBpData.push({
					date: getDate(dateObj),
					"Diastolic Blood Pressure": row.VALUE,
				});
			}

			if (row.DESCRIPTION === "Systolic Blood Pressure") {
				let dateObj = new Date(row.DATE);
				newSBpData.push({
					date: getDate(dateObj),
					"Systolic Blood Pressure": row.VALUE,
				});
			}

			if (row.DESCRIPTION === "Body Mass Index") {
				let dateObj = new Date(row.DATE);
				newBMIData.push({
					date: getDate(dateObj),
					BMI: row.VALUE,
				});
			}
			if (row.DESCRIPTION === "Heart rate") {
				let dateObj = new Date(row.DATE);
				newHeartRateData.push({
					date: getDate(dateObj),
					HeartRate: row.VALUE,
				});
			}
		}

		setDBpData(newDBpData);
		setSBpData(newSBpData);
		setBmiData(newBMIData);
		setHeartRateData(newHeartRateData);
	}, [rows]);

	const calculateBMI = () => {
		if (bmiData[bmiData.length - 1].BMI <= 18.5) {
			return "Underweight";
		} else if (
			bmiData[bmiData.length - 1].BMI > 18.5 &&
			bmiData[bmiData.length - 1].BMI < 25
		) {
			return "Normal weight";
		} else if (
			bmiData[bmiData.length - 1].BMI > 25 &&
			bmiData[bmiData.length - 1].BMI < 30
		) {
			return "Overweight";
		} else if (bmiData[bmiData.length - 1].BMI > 30) {
			return "Obesity";
		}

		return "Not enought data";
	};

	return (
		<div ref={chartContainerRef} id="chart-container">
			{chartContainerRef.current && (
				<>
					<Paper className={classes.container}>
						<Typography variant="h5">BMI</Typography>
						<div className={classes.paperContainer}>
							<LineChart
								className={classes.graph}
								width={(chartContainerRef.current.offsetWidth * 80) / 100}
								height={100}
								data={bmiData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="BMI"
									stroke="green"
									dot={{ strokeWidth: 4 }}
									activeDot={{ stroke: "green", strokeWidth: 8, r: 8 }}
									unit=" kg/m2"
								/>
							</LineChart>
						</div>
						<Typography>{bmiData.length > 0 && calculateBMI()}</Typography>
					</Paper>
					<Paper className={classes.container}>
						<Typography variant="h5">Diastolic Blood Pressure</Typography>
						<div className={classes.paperContainer}>
							<LineChart
								className={classes.graph}
								width={(chartContainerRef.current.offsetWidth * 80) / 100}
								height={100}
								data={dBpData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="Diastolic Blood Pressure"
									stroke="#8884d8"
									dot={{ strokeWidth: 4 }}
									activeDot={{ stroke: "#8884d8", strokeWidth: 8, r: 8 }}
									unit=" mm[Hg]"
								/>
							</LineChart>
						</div>
						<Typography>See a doctor</Typography>
					</Paper>

					<Paper className={classes.container}>
						<Typography variant="h5">Systolic Blood Pressure</Typography>
						<div className={classes.paperContainer}>
							<LineChart
								className={classes.graph}
								width={(chartContainerRef.current.offsetWidth * 80) / 100}
								height={100}
								data={sBpData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="Systolic Blood Pressure"
									stroke="#d88684"
									dot={{ strokeWidth: 4 }}
									activeDot={{ stroke: "#d88684", strokeWidth: 8, r: 8 }}
									unit=" mm[Hg]"
								/>
							</LineChart>
						</div>
						<Typography>See a doctor</Typography>
					</Paper>
					<Paper className={classes.container}>
						<Typography variant="h5">Heart Rate Avg</Typography>
						<div className={classes.paperContainer}>
							<LineChart
								className={classes.graph}
								width={(chartContainerRef.current.offsetWidth * 80) / 100}
								height={100}
								data={heartRateData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="HeartRate"
									stroke="red"
									dot={{ strokeWidth: 4 }}
									activeDot={{ stroke: "red", strokeWidth: 8, r: 8 }}
									unit="/min"
								/>
							</LineChart>
						</div>
						<Typography>See a doctor</Typography>
					</Paper>
				</>
			)}
		</div>
	);
}
