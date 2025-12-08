import { MatchesList } from "./MatchesList";
import { Outlet } from "react-router-dom";

export const Matches: React.FC = () => {
	return (
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Live Games</p>
			<MatchesList />
			<Outlet />
		</div>
	);
};
