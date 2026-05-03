import { API_ENDPOINT } from "../utls/constants";

export interface Sport {
	id: number;
	name: string;
}

export const listSports = async (): Promise<Sport[]> => {
	const response = await fetch(`${API_ENDPOINT}/sports`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch sports!");
	}
	const data = await response.json();
	return data.sports;
};

export const showSport = async (sportId: number): Promise<Sport> => {
	const response = await fetch(`${API_ENDPOINT}/sports/${sportId}`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch sport details!");
	}
	const data = await response.json();
	return data.sport;
};
