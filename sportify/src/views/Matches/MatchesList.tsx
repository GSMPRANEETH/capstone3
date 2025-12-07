import React, { forwardRef, useEffect, useState } from "react";
import { MatchesPayload } from "../../utls/Matches/types";
import { Link } from "react-router-dom";
import { listMatches } from "../../contexts/Matches/actions";

export const MatchesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const [matches, setMatches] = useState<MatchesPayload[]>([]);

		const obtainMatches = async () => {
			const data = await listMatches();
			setMatches(data);
		};
		useEffect(() => {
			obtainMatches();
		}, []);
		return (
			<div ref={ref} {...props} className="flex gap-4 overflow-x-auto pb-4">
				{matches.map((match) => (
					<Link
						key={match.id}
						to={`match/${match.id}`}
						className="flex-shrink-0 border border-gray-300 rounded-lg p-4 min-w-max"
					>
						<p className="font-semibold">{match.name}</p>
						<p className="font-italic">Sport: {match.sportName}</p>
						<p>Location: {match.location}</p>
						<p>Status: {match.isRunning ? "Running" : "Not Running"}</p>
					</Link>
				))}
			</div>
		);
	}
);
