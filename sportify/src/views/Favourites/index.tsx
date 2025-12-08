import { useState, useEffect } from "react";
import { listSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { listTeams } from "../../contexts/Teams/actions";
import { Team } from "../../contexts/Teams/types";
import { usePreferencesState } from "../../contexts/Preferences/context";
import { FavList } from "./FavList";

export const Favourites: React.FC = () => {
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedSport, setSelectedSport] = useState<number | "">("");
	const [selectedTeam, setSelectedTeam] = useState<number | "">("");
	const preferencesState = usePreferencesState();
	const isAuth = !!localStorage.getItem("authToken");
	const obtainSports = async () => {
		const sportsData = await listSports();
		const preferredSports = preferencesState?.preferences?.sports || [];
		const filteredSports = isAuth
			? sportsData.filter((sport: Sport) => preferredSports.includes(sport.id))
			: sportsData;
		setSports(filteredSports);
	};
	const obtainTeams = async () => {
		const teamsData = await listTeams();
		const preferredTeams = preferencesState?.preferences?.teams || [];
		const filteredTeams = isAuth
			? teamsData.filter((team: Team) => preferredTeams.includes(team.id))
			: teamsData;
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
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Favourites</p>
			<div>
				<p>Sports</p>
				<select
					className="border rounded p-2 w-full"
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
					className="border rounded p-2 w-full"
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
			<FavList sportId={selectedSport} teamId={selectedTeam} />
		</div>
	);
};
