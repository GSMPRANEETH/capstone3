import { useState, useEffect } from "react";
import { showMatch } from "../../contexts/Matches/actions";
import { MatchDetailsPayload } from "../../contexts/Matches/types";
import { Link } from "react-router-dom";

export const MatchCard: React.FC<{ id: number }> = ({ id }) => {
	const matchID = id.toString();

	const [match, setMatch] = useState<MatchDetailsPayload>(
		{} as MatchDetailsPayload
	);

	const obtainDetails = async () => {
		const details = await showMatch(matchID ?? "");
		setMatch(details);
	};

	const refreshDetails = async () => {
		await obtainDetails();
		alert("Match details refreshed");
	};
	useEffect(() => {
		obtainDetails();
	}, []);
	return (
		<div
			key={match.id}
			className="border border-gray-300 rounded-lg p-4 min-w-[20rem]"
		>
			{match?.isRunning && (
				<div className="flex items-center gap-1 text-red-600 font-bold">
					<p className="text-xs">Live</p>
					<button onClick={refreshDetails} title="Refresh Match Details">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
			)}
			<p className="font-italic">{match.sportName}</p>
			<p className="font-semibold">{match.name}</p>
			{match?.teams?.map((team) => (
				<div key={team.id} className="flex justify-between items-center w-full">
					<p key={team.id}>{team.name}</p>
					<p>{match.score[team.name]}</p>
				</div>
			))}
			<Link to={`match/${match.id}`} state={{ match }} className="underline">
				See Details
			</Link>
		</div>
	);
};
