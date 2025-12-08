import React from "react";
import { ArticlesList } from "./ArticlesList";
import { Outlet } from "react-router-dom";

export const Articles: React.FC = () => {
	return (
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Trending News</p>
			<ArticlesList />
			<Outlet />
		</div>
	);
};
