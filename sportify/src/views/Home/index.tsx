import React, { useEffect } from "react";
import { Articles } from "../Articles";
import { Matches } from "../Matches";
import { Outlet } from "react-router-dom";
import { Favourites } from "../Favourites";
import { getUserPreferences } from "../../contexts/Preferences/actions";
import { usePreferencesDispatch } from "../../contexts/Preferences/context";
export const Home: React.FC = () => {
	const preferencesDispatch = usePreferencesDispatch();
	const isAuth = !!localStorage.getItem("authToken");
	useEffect(() => {
		if (isAuth) {
			getUserPreferences(preferencesDispatch);
		}
	}, [isAuth]);
	return (
		<>
			<Matches />
			<div className="flex gap-4">
				<div className="w-3/4">
					<Articles />
				</div>
				<div className="w-1/4">
					<Favourites />
				</div>
			</div>
			<Outlet />
		</>
	);
};
