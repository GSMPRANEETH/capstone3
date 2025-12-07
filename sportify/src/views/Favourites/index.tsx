import { useState, useEffect } from "react";
import { fetchSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { fetchTeams } from "../../contexts/Teams/actions";
import { Team } from "../../contexts/Teams/types";

export const Favourites: React.FC = () => {
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);

	const obtainSports = async () => {
		const sportsData = await fetchSports();
		setSports(sportsData);
	};
	const obtainTeams = async () => {
		const teamsData = await fetchTeams();
		setTeams(teamsData);
	};
	useEffect(() => {
		obtainSports();
		obtainTeams();
	}, []);
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
