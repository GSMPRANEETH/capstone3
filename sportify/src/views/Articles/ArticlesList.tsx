import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticlesPayload } from "../../utls/Articles/types";
import { listArticles } from "../../contexts/Articles/actions";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);

		const obtainArticles = async () => {
			const articlesData = await listArticles();
			setArticles(articlesData);
		};

		useEffect(() => {
			obtainArticles();
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
