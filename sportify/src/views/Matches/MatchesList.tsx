import React, { forwardRef, useEffect, useState } from "react";
import { MatchesPayload } from "../../contexts/Matches/types";
import { Link } from "react-router-dom";
import { listMatches } from "../../contexts/Matches/actions";
import {
	useMatchesDispatch,
	useMatchesState,
} from "../../contexts/Matches/context";

export const MatchesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const matchesState = useMatchesState();
		const matchesDispatch = useMatchesDispatch();
		useEffect(() => {
			listMatches(matchesDispatch);
		}, []);
		return (
			<div ref={ref} {...props} className="flex gap-4 overflow-x-auto pb-4">
				{matchesState?.matches.map((match) => (
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
