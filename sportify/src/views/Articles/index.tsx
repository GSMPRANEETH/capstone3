import React from "react";
import { ArticlesList } from "./ArticlesList";
import { Outlet } from "react-router-dom";

export const Articles: React.FC = () => {
	return (
		<>
			<p className="text-4xl">Trending News</p>
			<ArticlesList />
			<Outlet />
		</>
	);
};
