import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listArticles } from "../../contexts/Articles/actions";
import {
	useArticlesDispatch,
	useArticlesState,
} from "../../contexts/Articles/context";
import { usePreferencesState } from "../../contexts/Preferences/context";
import { ArticlesPayload } from "../../contexts/Articles/types";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const articleState = useArticlesState();
		const articleDispatch = useArticlesDispatch();
		const preferencesState = usePreferencesState();
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);
		const isAuth = !!localStorage.getItem("authToken");

		useEffect(() => {
			listArticles(articleDispatch);
		}, []);

		useEffect(() => {
			const preferredSports = preferencesState?.preferences?.sports || [];
			const preferredTeams = preferencesState?.preferences?.teams || [];

			if (isAuth) {
				let filteredArticles: ArticlesPayload[] = [];

				if (preferredSports.length > 0) {
					filteredArticles =
						articleState?.articles?.filter((article) =>
							preferredSports.includes(article.sport.id)
						) || [];
				}

				if (preferredTeams.length > 0) {
					const teamMatchedArticles =
						articleState?.articles?.filter(
							(article) =>
								article.teams.some((team) =>
									preferredTeams.includes(team.id)
								) && !filteredArticles.some((a) => a.id === article.id)
						) || [];
					filteredArticles = [...filteredArticles, ...teamMatchedArticles];
				}

				setArticles(filteredArticles);
			} else {
				setArticles(articleState?.articles || []);
			}
		}, [
			preferencesState?.preferences?.sports,
			preferencesState?.preferences?.teams,
			articleState?.articles,
		]);
		if (articles.length === 0) {
			return <p>No articles available.</p>;
		}
		if (articleState?.isLoading) {
			return <p>Loading articles...</p>;
		}
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
