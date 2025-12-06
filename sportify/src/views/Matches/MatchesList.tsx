import React, { forwardRef, useEffect, useState } from "react";
import { MatchesPayload } from "../../utls/Matches/types";
import { API_ENDPOINT } from "../../utls/constants";
import { Link } from "react-router-dom";

export const MatchesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const [matches, setMatches] = useState<MatchesPayload[]>([]);
		const fetchMatches = async () => {
			try {
				const response = await fetch(`${API_ENDPOINT}/matches`, {
					method: "GET",
					headers: { "Content-type": "application/json" },
				});

				if (!response.ok) {
					throw new Error("Failed to fetch matches!");
				}
				const data = await response.json();
				setMatches(data.matches);
			} catch (error) {
				console.error(error);
			}
		};
		useEffect(() => {
			fetchMatches();
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
