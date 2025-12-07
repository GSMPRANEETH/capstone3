import { API_ENDPOINT } from "../../utls/constants";

export const listMatches = async (dispatch: any) => {
	try {
		dispatch({ type: "LIST_MATCHES_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/matches`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch matches!");
		}
		const data = await response.json();
		dispatch({ type: "LIST_MATCHES_SUCCESS", payload: data.matches });
	} catch (error) {
		dispatch({
			type: "LIST_MATCHES_FAILURE",
			payload: (error as Error).message,
		});
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
