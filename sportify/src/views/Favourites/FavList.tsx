import { useState, useEffect } from "react";
import { useArticlesState } from "../../contexts/Articles/context";
import { articleState } from "../../contexts/Articles/reducer";
import { ArticlesPayload } from "../../contexts/Articles/types";
import { usePreferencesState } from "../../contexts/Preferences/context";

export const FavList: React.FC<{
	sportId: number | "";
	teamId: number | "";
}> = ({ sportId, teamId }) => {
	const articleState = useArticlesState();
	const preferencesState = usePreferencesState();
	const isAuth = !!localStorage.getItem("authToken");
	const [articles, setArticles] = useState<ArticlesPayload[]>([]);
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
							article.teams.some((team) => preferredTeams.includes(team.id)) &&
							!filteredArticles.some((a) => a.id === article.id)
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
	useEffect(() => {
		let chosenArticles = articles;
		if (sportId !== "") {
			chosenArticles = chosenArticles.filter(
				(article) => article.sport.id === sportId
			);
		}
		if (teamId !== "") {
			chosenArticles = chosenArticles.filter((article) =>
				article.teams.some((team) => team.id === teamId)
			);
		}
		setArticles(chosenArticles);
	}, [sportId, teamId]);
	return (
		<div className="max-h-[45vh] overflow-y-auto ">
			{articles.map((article) => (
				<div key={article.id}>
					<div className="flex border border-gray-800 p-4">
						<div className="w-3/4 gap-2 flex flex-col">
							<p className="text-xl font-semibold">{article.title}</p>
							<div className="flex justify-between items-center w-full">
								<a href={`article/${article.id}`}>Read More</a>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
