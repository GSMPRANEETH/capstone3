import { API_ENDPOINT } from "../../utls/constants";

export const fetchTeams = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}/teams`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});
		if (!response.ok) {
			throw new Error("Failed to fetch teams!");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
