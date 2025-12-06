import React, { forwardRef, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../utls/constants";
import { Link } from "react-router-dom";
import { ArticlesPayload } from "../../utls/Articles/types";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);
		const fetchArticles = async () => {
			try {
				const response = await fetch(`${API_ENDPOINT}/articles`, {
					method: "GET",
					headers: { "Content-type": "application/json" },
				});

				if (!response.ok) {
					throw new Error("Failed to fetch articles!");
				}
				const data = await response.json();
				setArticles(data);
			} catch (error) {
				console.error(error);
			}
		};
		useEffect(() => {
			fetchArticles();
		}, []);
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
