import { useState, useEffect } from "react";
import { listSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { listTeams } from "../../contexts/Teams/actions";
import { Team } from "../../contexts/Teams/types";
import { usePreferencesState } from "../../contexts/Preferences/context";

export const Favourites: React.FC = () => {
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const preferencesState = usePreferencesState();
	const obtainSports = async () => {
		const sportsData = await listSports();
		const preferredSports = preferencesState?.preferences?.sports || [];
		const filteredSports = sportsData.filter((sport: Sport) =>
			preferredSports.includes(sport.id)
		);
		setSports(filteredSports);
	};
	const obtainTeams = async () => {
		const teamsData = await listTeams();
		const preferredTeams = preferencesState?.preferences?.teams || [];
		const filteredTeams = teamsData.filter((team: Team) =>
			preferredTeams.includes(team.id)
		);
		setTeams(filteredTeams);
	};
	useEffect(() => {
		obtainSports();
		obtainTeams();
	}, [
		preferencesState?.preferences?.sports,
		preferencesState?.preferences?.teams,
	]);
	return (
		<>
			<p className="text-4xl">Favourites</p>
			<>
				<p>Sports</p>
				<select className="border rounded p-2 w-full">
					<option value="">-- Select a sport --</option>
					{sports.map((sport) => (
						<option key={sport.id} value={sport.id}>
							{sport.name}
						</option>
					))}
				</select>
				<p>Teams</p>
				<select className="border rounded p-2 w-full">
					<option value="">-- Select a team --</option>
					{teams.map((team) => (
						<option key={team.id} value={team.id}>
							{team.name}
						</option>
					))}
				</select>
			</>
		</>
	);
};
