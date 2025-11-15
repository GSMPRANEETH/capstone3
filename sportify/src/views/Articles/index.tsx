import React from "react";
import { ArticlesList } from "./ArticlesList";
import { Outlet } from "react-router-dom";

export const Articles: React.FC = () => {
	return (
		<>
			<ArticlesList />
			<Outlet />
		</>
	);
};
