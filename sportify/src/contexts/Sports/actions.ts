import { API_ENDPOINT } from "../../utls/constants";

export const fetchSports = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}/sports`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch sports!");
		}
		const data = await response.json();
		return data.sports;
	} catch (error) {
		console.error(error);
	}
};

export const showSport = async (sportId: number) => {
	try {
		const response = await fetch(`${API_ENDPOINT}/sports/${sportId}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch sport details!");
		}
		const data = await response.json();
		return data.sport;
	} catch (error) {
		console.error(error);
	}
};
