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

	useEffect(() => {
		obtainDetails();
	}, []);
	return (
		<Link
			key={match.id}
			to={`match/${match.id}`}
			state={{ match }}
			className="border border-gray-300 rounded-lg p-4 max-w-xs"
		>
			<p className="font-italic">{match.sportName}</p>
			<p className="font-semibold">{match.name}</p>
			{match?.teams?.map((team) => (
				<div key={team.id} className="flex justify-between items-center w-full">
					<p key={team.id}>{team.name}</p>
					<p>{match.score[team.name]}</p>
				</div>
			))}
		</Link>
	);
};
