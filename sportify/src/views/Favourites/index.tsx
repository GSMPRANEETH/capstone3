import React, { Suspense, lazy, useState, useEffect } from "react";
import { listSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { listTeams } from "../../contexts/Teams/actions";
import { Team } from "../../contexts/Teams/types";
import { usePreferencesState } from "../../contexts/Preferences/context";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/contexts/Auth/context";
const FavList = lazy(() =>
	import("./FavList").then((m) => ({ default: m.FavList }))
);

export const Favourites: React.FC = () => {
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedSport, setSelectedSport] = useState<number | "">("");
	const [selectedTeam, setSelectedTeam] = useState<number | "">("");
	const [baseTeams, setBaseTeams] = useState<Team[]>([]);
	const preferencesState = usePreferencesState();
	const { isAuthenticated: isAuth } = useAuth();
	const obtainSports = async () => {
		try {
			const sportsData = (await listSports()) ?? [];
			const preferredSports = preferencesState?.preferences?.sports || [];
			// Only filter when user actually has sports preferences
			const hasPrefs = isAuth && preferredSports.length > 0;
			const filteredSports = hasPrefs
				? sportsData.filter((sport: Sport) => preferredSports.includes(sport.id))
				: sportsData;
			setSports(filteredSports);
		} catch (error) {
			console.error("Failed to fetch sports:", error);
			setSports([]);
		}
	};
	const obtainTeams = async () => {
		try {
			const teamsData = (await listTeams()) ?? [];
			const preferredTeams = preferencesState?.preferences?.teams || [];
			// Only filter when user actually has team preferences
			const hasPrefs = isAuth && preferredTeams.length > 0;
			const filteredTeams = hasPrefs
				? teamsData.filter((team: Team) => preferredTeams.includes(team.id))
				: teamsData;
			setTeams(filteredTeams);
			setBaseTeams(teamsData);
		} catch (error) {
			console.error("Failed to fetch teams:", error);
			setTeams([]);
			setBaseTeams([]);
		}
	};
	useEffect(() => {
		obtainSports();
		obtainTeams();
	}, [
		preferencesState?.preferences?.sports,
		preferencesState?.preferences?.teams,
		isAuth,
	]);
	useEffect(() => {
		if (selectedSport === "") {
			setTeams(baseTeams);
		} else {
			const currSport = sports.find((sport) => sport.id === selectedSport);
			const filteredTeams = baseTeams.filter(
				(team) => team.plays === currSport?.name
			);
			setTeams(filteredTeams);
		}
	}, [selectedSport]);
	return (
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Favourites</p>
			<div>
				<p>Sports</p>
				<select
					className="border rounded p-2 w-full dark:bg-gray-700"
					value={selectedSport}
					onChange={(e) =>
						setSelectedSport(e.target.value ? Number(e.target.value) : "")
					}
				>
					<option value="">-- Select a sport --</option>
					{sports.map((sport) => (
						<option key={sport.id} value={sport.id}>
							{sport.name}
						</option>
					))}
				</select>
				<p>Teams</p>
				<select
					className="border rounded p-2 w-full dark:bg-gray-700"
					value={selectedTeam}
					onChange={(e) =>
						setSelectedTeam(e.target.value ? Number(e.target.value) : "")
					}
				>
					<option value="">-- Select a team --</option>
					{teams.map((team) => (
						<option key={team.id} value={team.id}>
							{team.name}
						</option>
					))}
				</select>
			</div>
			<ErrorBoundary>
				<Suspense fallback={<p>Loading favourites...</p>}>
					<FavList sportId={selectedSport} teamId={selectedTeam} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};
