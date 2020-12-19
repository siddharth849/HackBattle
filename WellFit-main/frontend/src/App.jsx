import Axios from "axios";
import React, { useState, useEffect } from "react";
import { IonApp } from "@ionic/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import AdbIcon from "@material-ui/icons/Adb";

import UserContext from "./context/UserContext";
import { ProtectedRoute } from "./protected";
import { ThemeProvider } from "@material-ui/core";
import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import Layout from "./layout";
import Signin from "./pages/SignIn";
import Exercise from "./components/Exercise";
import Dashboard from "./components/Dashboard";
import Hospitals from "./components/Hospitals";
import MealPlan from "./components/MealPlan";
import HealthCareAI from "./components/HealthCareAI";

const componentList = [
	{
		name: "Dashboard",
		url: "/",
		component: Dashboard,
		icon: DashboardIcon,
	},
	{
		name: "Meal Plan",
		url: "/meal-plan",
		component: MealPlan,
		icon: FastfoodIcon,
	},
	{
		name: "HealthCare AI",
		url: "/health-care-AI",
		component: HealthCareAI,
		icon: AdbIcon,
	},
	{
		name: "Exercise",
		url: "/exercise",
		component: Exercise,
		icon: AccessibilityNewIcon,
	},
	{
		name: "Hospitals",
		url: "/hospitals",
		component: Hospitals,
		icon: LocalHospitalIcon,
	},
];

const App = () => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});
	const [currentTheme, setCurrentTheme] = useState(false);

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

	useEffect(() => {
		checkLoggedIn();
	}, []);

	return (
		<ThemeProvider theme={currentTheme ? darkTheme : lightTheme}>
			<IonApp>
				<CssBaseline />
				<UserContext.Provider value={{ userData, setUserData }}>
					<BrowserRouter>
						<Switch>
							<Route
								path="/signin"
								exact
								render={(props) => <Signin {...props} />}
							/>
							<Layout
								setCurrentTheme={setCurrentTheme}
								currentTheme={currentTheme}
								componentList={componentList}
							>
								{componentList.map((item, key) => (
									<ProtectedRoute
										path={item.url}
										key={key}
										exact={true}
										component={item.component}
									/>
								))}
							</Layout>
						</Switch>
					</BrowserRouter>
				</UserContext.Provider>
			</IonApp>
		</ThemeProvider>
	);
};

export default App;
