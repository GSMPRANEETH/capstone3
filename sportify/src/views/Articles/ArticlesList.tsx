import React, { forwardRef, useEffect, useState, Suspense } from "react";
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
import { useAuth } from "@/contexts/Auth/context";

export const ArticlesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const articleState = useArticlesState();
		const articleDispatch = useArticlesDispatch();
		const preferencesState = usePreferencesState();
		const [articles, setArticles] = useState<ArticlesPayload[]>([]);
		const [userArticles, setUserArticles] = useState<ArticlesPayload[]>([]);
		const [sports, setSports] = useState<Sport[]>([]);
		const { isAuthenticated: isAuth } = useAuth();
		const [option, setOption] = useState<string>("default");
		const sortByDateDesc = (arr: ArticlesPayload[] = []) =>
			[...arr].sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
		const obtainSports = async (preferredSports: number[]) => {
			const sportsData = await listSports();
			// Only filter tabs by preference when user actually has preferences set
			const hasPrefs = isAuth && preferredSports.length > 0;
			const filteredSports = hasPrefs
				? sportsData.filter((sport: Sport) =>
						preferredSports.includes(sport.id)
				  )
				: sportsData;
			setSports(filteredSports);
		};

		useEffect(() => {
			listArticles(articleDispatch);
		}, []);

		useEffect(() => {
			const preferredSports = preferencesState?.preferences?.sports || [];
			const preferredTeams = preferencesState?.preferences?.teams || [];
			obtainSports(preferredSports);
			const hasPrefs =
				isAuth && (preferredSports.length > 0 || preferredTeams.length > 0);

			if (hasPrefs) {
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
				const sorted = sortByDateDesc(filteredArticles);
				setArticles(sorted);
				setUserArticles(sorted);
			} else {
				const sorted = sortByDateDesc(articleState?.articles || []);
				setArticles(sorted);
				setUserArticles(sorted);
			}
		}, [
			preferencesState?.preferences?.sports,
			preferencesState?.preferences?.teams,
			articleState?.articles,
		]);

		useEffect(() => {
			if (option != "default") {
				const filteredArticles = articleState?.articles?.filter(
					(article) => article.sport.name === option
				);
				setArticles(sortByDateDesc(filteredArticles || []));
			} else {
				setArticles(userArticles);
			}
		}, [option]);

		if (articleState?.isLoading) {
			return <p>Loading articles...</p>;
		}
		return (
			<div>
				<Tabs value={option} onValueChange={setOption}>
					<TabsList className="flex overflow-x-auto whitespace-nowrap w-full flex-nowrap">
						<TabsTrigger value="default" className="shrink-0">
							{isAuth ? "Your News" : "General"}
						</TabsTrigger>
						{sports.map((sport: Sport) => (
							<TabsTrigger key={sport.id} value={sport.name} className="shrink-0">
								{sport.name}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent
						value={option}
						ref={ref}
						{...props}
						className="max-h-[48vh] overflow-y-auto "
					>
						{articles.length > 0 ? (
							<div>
								{articles.map((article) => (
									<div key={article.id}>
										<div className="flex border border-gray-800 p-4 mb-2">
											<div className="w-3/4 gap-2 flex flex-col">
												<p className="text-xs">{article.sport.name}</p>
												<p className="text-xl font-semibold">{article.title}</p>
												<p className="text-sm line-clamp-2">
													{article.summary}
												</p>
												<div className="flex justify-between items-center w-full">
													<p>{new Date(article.date).toLocaleDateString()}</p>
													<Link
														to={`/article/${article.id}`}
														className="underline"
													>
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
						) : (
							<p className="m-4">No articles available.</p>
						)}
					</TabsContent>
				</Tabs>
			</div>
		);
	}
);
