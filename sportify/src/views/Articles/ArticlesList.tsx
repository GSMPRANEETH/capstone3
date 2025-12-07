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

			if (preferredSports.length === 0) {
				// If no sport preferences, show all articles
				setArticles(articleState?.articles ?? []);
				console.log("No preferences set, showing all articles");
			} else {
				// Filter by preferred sports
				const filteredArticles = articleState?.articles.filter((article) =>
					preferredSports.includes(article.sport.id)
				);
				setArticles(filteredArticles ?? []);
				console.log("Filtered Articles: ", filteredArticles);
				console.log("Preferences Sports: ", preferredSports);
			}
		}, [articleState?.articles, preferencesState?.preferences?.sports]);

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
