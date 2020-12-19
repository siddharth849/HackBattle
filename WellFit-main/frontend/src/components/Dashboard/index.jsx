import React, { useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import {
	Paper,
	Avatar,
	CssBaseline,
	Typography,
	Grid,
	Container,
	Button,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import Careplans from "./Careplans";
import Encounters from "./Encounters";
import Medications from "./Medications";
import Conditions from "./Conditions";
import Chart from "./Chart";

import useStyles from "./styles";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
	const { userData } = useContext(UserContext);
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<main className={classes.content}>
			<CssBaseline />
			<div className={classes.appBarSpacer} />
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={9}>
						<div className={fixedHeightPaper}>
							<Chart userData={userData} />
						</div>
					</Grid>
					<Grid item xs={12} md={3}>
						<Paper className={fixedHeightPaper}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									padding: 10,
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										marginBottom: 10,
									}}
								>
									<Avatar
										className={classes.large}
										src="https://avatars.dicebear.com/api/male/adas.svg"
										alt="avatar"
									/>
								</div>
								<Typography>Welcome</Typography>
								<Typography>
									{userData.user &&
										userData.user.FIRST + " " + userData.user.LAST}
								</Typography>
								<Typography>
									Expenses:
									<strong>
										{userData.user && " " + userData.user.HEALTHCARE_EXPENSES}
									</strong>
								</Typography>
								<Typography>
									Coverage:{" "}
									<strong>
										{userData.user && " " + userData.user.HEALTHCARE_COVERAGE}
									</strong>
								</Typography>
								<div className={classes.logoutBTN}>
									<FavoriteIcon color="secondary" />
									<Typography>
										{userData.user && "  " + userData.user.POINTS}
										(Points)
									</Typography>
								</div>
								<div className={classes.logoutBTN}>
									<FitnessCenterIcon color="secondary" />
									<Typography>
										{userData.user && "  " + userData.user.CALORIE}(Cal)
									</Typography>
								</div>
								<div className={classes.logoutBTN}>
									<Button
										variant="contained"
										color="primary"
										component={Link}
										to="/exercise"
									>
										Go to exercise
									</Button>
								</div>
							</div>
						</Paper>
					</Grid>

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Careplans userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Encounters userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Conditions userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Medications userData={userData} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}
