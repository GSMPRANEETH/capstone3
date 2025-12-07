import React from "react";
import { Articles } from "../Articles";
import { Matches } from "../Matches";
import { Outlet } from "react-router-dom";
import { Favourites } from "../Favourites";
export const Home: React.FC = () => {
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
