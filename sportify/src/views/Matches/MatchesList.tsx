import React, { forwardRef, useEffect, useState, Suspense, lazy } from "react";
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
import ErrorBoundary from "@/components/ErrorBoundary";

const MatchCard = lazy(() =>
	import("./MatchCard").then((m) => ({ default: m.MatchCard }))
);

export const MatchesList = forwardRef<HTMLDivElement, React.PropsWithChildren>(
	(props, ref) => {
		const matchesState = useMatchesState();
		const matchesDispatch = useMatchesDispatch();
		const preferencesState = usePreferencesState();
		const [matches, setMatches] = useState<MatchesPayload[]>([]);
		const isAuth = !!localStorage.getItem("authToken");
		useEffect(() => {
			listMatches(matchesDispatch);
		}, []);
		useEffect(() => {
			const loadAndFilter = async () => {
				const preferredTeams = preferencesState?.preferences?.teams || [];
				const preferredSports = preferencesState?.preferences?.sports || [];

				// Fetch fresh sports data with current preferences
				const sportsData = await listSports();
				const filteredSports = isAuth
					? sportsData.filter((sport: Sport) =>
							preferredSports.includes(sport.id)
					  )
					: sportsData;

				const sortedMatches = (matchesState?.matches || []).sort(
					(a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
				);

				if (isAuth) {
					let filteredMatches: MatchesPayload[] = [];

					if (preferredSports.length > 0) {
						filteredMatches = sortedMatches.filter((match) =>
							filteredSports.some(
								(sport: Sport) => sport.name === match.sportName
							)
						);
					}

					if (preferredTeams.length > 0) {
						const teamMatchedMatches = sortedMatches.filter(
							(match) =>
								match.teams.some((team) => preferredTeams.includes(team.id)) &&
								!filteredMatches.some((m) => m.id === match.id)
						);
						filteredMatches = [...filteredMatches, ...teamMatchedMatches];
					}

					setMatches(filteredMatches);
				} else {
					setMatches(sortedMatches);
				}
			};

			loadAndFilter();
		}, [
			preferencesState?.preferences?.teams,
			preferencesState?.preferences?.sports,
			matchesState?.matches,
			isAuth,
		]);
		if (matchesState?.isLoading) {
			return <p>Loading matches...</p>;
		}
		if (matches.length === 0) {
			return <p>No live matches available.</p>;
		}
		return (
			<div ref={ref} {...props} className="flex gap-4 overflow-x-auto pb-4">
				<ErrorBoundary>
					<Suspense fallback={<p>Loading matches...</p>}>
						{matches.map((match) => (
							<MatchCard key={match.id} id={match.id} />
						))}
					</Suspense>
				</ErrorBoundary>
			</div>
		);
	}
);
