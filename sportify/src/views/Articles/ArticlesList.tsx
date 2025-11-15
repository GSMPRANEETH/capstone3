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
					throw new Error("Sign-in failed!");
				}
				const data = await response.json();
				console.log("articles = ", data);
				setArticles(data);
				console.log("set articles = ", articles);
			} catch (error) {
				console.error(error);
			}
		};
		useEffect(() => {
			fetchArticles();
		}, []);
		return (
			<div ref={ref} {...props}>
				<p className="text-4xl">Articles</p>
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
