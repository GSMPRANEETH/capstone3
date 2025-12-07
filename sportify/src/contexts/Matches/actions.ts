import { API_ENDPOINT } from "../../utls/constants";

export const listMatches = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}/matches`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch matches!");
		}
		const data = await response.json();
		return data.matches;
	} catch (error) {
		console.error(error);
	}
};

export const showMatch = async (matchID: string) => {
	const id = matchID;
	try {
		const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch match details!");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
