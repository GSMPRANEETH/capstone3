import { MatchesList } from "./MatchesList";
import { Outlet } from "react-router-dom";

export const Matches: React.FC = () => {
	return (
		<>
			<p className="text-4xl">Live Games</p>
			<MatchesList />
			<Outlet />
		</>
	);
};
