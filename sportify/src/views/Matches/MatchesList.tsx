import React, { forwardRef, useEffect, useState } from "react";
import { MatchesPayload } from "../../contexts/Matches/types";
import { Link } from "react-router-dom";
import { listMatches } from "../../contexts/Matches/actions";
import {
	useMatchesDispatch,
	useMatchesState,
} from "../../contexts/Matches/context";
import { usePreferencesState } from "../../contexts/Preferences/context";
import { listSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { listTeams } from "../../contexts/Teams/actions";
import { Team } from "../../contexts/Teams/types";

export const MatchesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const matchesState = useMatchesState();
		const matchesDispatch = useMatchesDispatch();
		const preferencesState = usePreferencesState();
		const [matches, setMatches] = useState<MatchesPayload[]>([]);
		const [sports, setSports] = useState<Sport[]>([]);
		const isAuth = !!localStorage.getItem("authToken");
		const obtainSports = async () => {
			const sportsData = await listSports();
			const preferredSports = preferencesState?.preferences?.sports || [];
			const filteredSports =
				preferredSports.length > 0
					? sportsData.filter((sport: Sport) =>
							preferredSports.includes(sport.id)
					  )
					: sportsData;
			setSports(filteredSports);
		};
		useEffect(() => {
			listMatches(matchesDispatch);
			obtainSports();
		}, []);
		useEffect(() => {
			const liveMatches = matchesState?.matches.filter(
				(match) => match.isRunning
			);
			if (isAuth) {
				const preferredTeams = preferencesState?.preferences?.teams || [];

				const filteredMatches = liveMatches?.filter((match) => {
					const sportMatch =
						sports.length === 0 ||
						sports.some((sport) => sport.name === match.sportName);
					const teamMatch =
						preferredTeams.length === 0 ||
						match.teams.some((team) =>
							preferredTeams.some((preferredTeam) => preferredTeam === team.id)
						);
					return sportMatch && teamMatch;
				});

				setMatches(filteredMatches || []);
			} else {
				setMatches(liveMatches || []);
			}
		}, [sports, preferencesState?.preferences?.teams, matchesState?.matches]);
		if (matches.length === 0) {
			return <p>No live matches available.</p>;
		}
		if (matchesState?.isLoading) {
			return <p>Loading matches...</p>;
		}
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
