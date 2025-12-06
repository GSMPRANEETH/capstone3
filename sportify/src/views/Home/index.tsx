import React from "react";
import { Articles } from "../Articles";
import { Sports } from "../Matches";
import { Outlet } from "react-router-dom";
export const Home: React.FC = () => {
	return (
		<>
			<Sports />
			<Articles />
			<Outlet />
		</>
	);
};
