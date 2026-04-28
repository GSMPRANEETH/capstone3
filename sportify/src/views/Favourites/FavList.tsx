import { useState, useEffect } from "react";
import { useArticlesState } from "../../contexts/Articles/context";
import { ArticlesPayload } from "../../contexts/Articles/types";
import { usePreferencesState } from "../../contexts/Preferences/context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/context";

export const FavList: React.FC<{
	sportId: number | "";
	teamId: number | "";
}> = ({ sportId, teamId }) => {
	const articleState = useArticlesState();
	const preferencesState = usePreferencesState();
	const { isAuthenticated: isAuth } = useAuth();
	const [articles, setArticles] = useState<ArticlesPayload[]>([]);
	const [userArticles, setUserArticles] = useState<ArticlesPayload[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		const preferredSports = preferencesState?.preferences?.sports || [];
		const preferredTeams = preferencesState?.preferences?.teams || [];
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
							article.teams.some((team) => preferredTeams.includes(team.id)) &&
							!filteredArticles.some((a) => a.id === article.id)
					) || [];
				filteredArticles = [...filteredArticles, ...teamMatchedArticles];
			}

			setArticles(filteredArticles);
			setUserArticles(filteredArticles);
		} else {
			setArticles(articleState?.articles || []);
			setUserArticles(articleState?.articles || []);
		}
	}, [
		preferencesState?.preferences?.sports,
		preferencesState?.preferences?.teams,
		articleState?.articles,
	]);
	useEffect(() => {
		let chosenArticles = userArticles;
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
		<div className="max-h-[40vh] overflow-y-auto ">
			{articles.map((article) => (
				<div key={article.id}>
					<div className="flex border border-gray-400 p-2 mb-2">
						<div className="gap-2 flex flex-col">
							<p className="text-xl font-semibold">{article.title}</p>
							<p className="text-sm line-clamp-2">{article.summary}</p>
							<button
								onClick={() => navigate(`/article/${article.id}`)}
								className="bg-gray-400 min-w-full"
							>
								Read More
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
