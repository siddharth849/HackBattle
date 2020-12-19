import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import UserContext from "../context/UserContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { userData } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				return userData.user === undefined ? (
					<Redirect
						to={{
							pathname: "/signin",
							state: {
								from: props.location,
							},
						}}
					/>
				) : (
					<Component {...props} />
				);
			}}
		/>
	);
};
