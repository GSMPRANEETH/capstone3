import { API_ENDPOINT } from "../utls/constants";

export interface Team {
	id: number;
	name: string;
	plays: string;
}

export const listTeams = async (): Promise<Team[]> => {
	const response = await fetch(`${API_ENDPOINT}/teams`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch teams!");
	}
	const data = await response.json();
	return data;
};

export const showTeam = async (teamId: number): Promise<Team> => {
	const response = await fetch(`${API_ENDPOINT}/teams/${teamId}`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch team details!");
	}
	const data = await response.json();
	return data.team;
};
