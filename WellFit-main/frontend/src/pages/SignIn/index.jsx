import React, { useState, useContext } from "react";
import Axios from "axios";
import {
	Avatar,
	Button,
	TextField,
	Paper,
	Grid,
	Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import UserContext from "../../context/UserContext";
import { Redirect } from "react-router";

export default function SignIn(props) {
	const { userData, setUserData } = useContext(UserContext);

	const classes = useStyles();
	const { history } = props;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");
		if (token === null) {
			localStorage.setItem("auth-token", "");
			token = "";
		}
		const tokenRes = await Axios.post("is-token-valid", null, {
			headers: { "x-auth-token": token },
		});

		if (tokenRes.data) {
			const userRes = await Axios.get("get-current-patient", {
				headers: { "x-auth-token": token },
			});

			setUserData({
				token: token,
				user: userRes.data,
			});
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const loginUser = { email, password };
			const loginRes = await Axios.post("login", loginUser);
			console.log(loginRes);
			if (loginRes.data.user) {
				setUserData({
					token: loginRes.data.token,
					user: loginRes.data.user,
				});
			}
			localStorage.setItem("auth-token", loginRes.data.token);
			checkLoggedIn();
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};

	if (userData.user !== undefined) return <Redirect to="/" />;
	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				<img
					height="auto"
					width="100%"
					src={require("../../assets/signinPhoto.jpg")}
					alt="signinimage"
					className={classes.gridImage}
				/>
			</Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleLogin}
						>
							Sign In
						</Button>
					</form>
				</div>
				<Paper style={{ padding: 20 }} className={classes.paper}>
					<Typography variant="h5">
						Use this Credentials to login <br />
						Email: test18@test.com (number between 1-1171) <br />
						Password: 123456 (same for every user)
					</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}
