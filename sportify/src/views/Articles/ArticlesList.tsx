import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listArticles } from "../../contexts/Articles/actions";
import {
	useArticlesDispatch,
	useArticlesState,
} from "../../contexts/Articles/context";
import { usePreferencesState } from "../../contexts/Preferences/context";
import { ArticlesPayload } from "../../contexts/Articles/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listSports } from "@/contexts/Sports/actions";
import { Sport } from "@/contexts/Sports/types";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const articleState = useArticlesState();
		const articleDispatch = useArticlesDispatch();
		const preferencesState = usePreferencesState();
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);
		const [sports, setSports] = useState<Sport[]>([]);
		const isAuth = !!localStorage.getItem("authToken");

		const obtainSports = async () => {
			const sportsData = await listSports();
			setSports(sportsData);
		};

		useEffect(() => {
			listArticles(articleDispatch);
			obtainSports();
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

		if (articleState?.isLoading) {
			return <p>Loading articles...</p>;
		}
		if (articles.length === 0) {
			return <p>No articles available.</p>;
		}
		return (
			<div>
				<Tabs defaultValue="default" className="w-[400px]">
					<TabsList>
						<TabsTrigger value="default">
							{isAuth ? "Your News" : "General"}
						</TabsTrigger>
						{sports.map((sport: Sport) => (
							<TabsTrigger key={sport.id} value={sport.name}>
								{sport.name}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value="default">
						Make changes to your account here.
					</TabsContent>
					<TabsContent value="password">Change your password here.</TabsContent>
				</Tabs>
				<div ref={ref} {...props} className="max-h-[60vh] overflow-y-auto ">
					{articles.map((article) => (
						<div key={article.id}>
							<div className="flex border border-gray-800 p-4 mb-2">
								<div className="w-3/4 gap-2 flex flex-col">
									<p className="text-xs">{article.sport.name}</p>
									<p className="text-xl font-semibold">{article.title}</p>
									<p className="text-sm line-clamp-2">{article.summary}</p>
									<div className="flex justify-between items-center w-full">
										<p className="text-xs">{article.date}</p>
										<Link to={`/article/${article.id}`} className="underline">
											Read More ...
										</Link>
									</div>
								</div>
								<img
									className="h-24 object-cover ml-4 w-1/4"
									src={article.thumbnail}
									alt={article.title}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
);
