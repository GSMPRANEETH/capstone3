import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listArticles } from "../../contexts/Articles/actions";
import {
	useArticlesDispatch,
	useArticlesState,
} from "../../contexts/Articles/context";
import {
	usePreferencesDispatch,
	usePreferencesState,
} from "../../contexts/Preferences/context";
import { ArticlesPayload } from "../../contexts/Articles/types";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const articleState = useArticlesState();
		const articleDispatch = useArticlesDispatch();
		const preferencesState = usePreferencesState();
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);

		useEffect(() => {
			listArticles(articleDispatch);
		}, [articleDispatch]);

	useEffect(() => {
		const preferredSports = preferencesState?.preferences?.sports || [];
		const preferredTeams = preferencesState?.preferences?.teams || [];

		let filteredArticles: ArticlesPayload[] = [];

		// If no preferences set, show all articles
		if (preferredSports.length === 0 && preferredTeams.length === 0) {
			filteredArticles = articleState?.articles || [];
		} else {
			// Start with articles matching sports preferences
			if (preferredSports.length > 0) {
				filteredArticles =
					articleState?.articles?.filter((article) =>
						preferredSports.includes(article.sport.id)
					) || [];
			}

			// Add articles matching team preferences (avoiding duplicates)
			if (preferredTeams.length > 0) {
				const teamMatchedArticles =
					articleState?.articles?.filter(
						(article) =>
							article.teams.some((team) => preferredTeams.includes(team.id)) &&
							!filteredArticles.some((a) => a.id === article.id)
					) || [];
				filteredArticles = [...filteredArticles, ...teamMatchedArticles];
			}
		}

		setArticles(filteredArticles);
		console.log("Filtered Articles: ", filteredArticles);
		console.log("Preferred Sports: ", preferredSports);
		console.log("Preferred Teams: ", preferredTeams);
	}, [
		articleState?.articles,
		preferencesState?.preferences?.sports,
		preferencesState?.preferences?.teams,
	]);
	return (
		<div ref={ref} {...props}>
			{articles.map((article) => (
				<Link key={article.id} to={`article/${article.id}`}>
					<div className="border-b border-gray-300">
						<p className="font-semibold">Title: {article.title}</p>
						<p className="font-italic">Sport: {article.sport.name}</p>
					</div>
				</Link>
			))}
		</div>
	);
	}
);
