import { API_ENDPOINT } from "../../utls/constants";

export const getUserPreferences = async () => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch preferences!");
		}
		const data = await response.json();
		return data.preferences;
	} catch (error) {
		console.error(error);
	}
};

export const updateUserPreferences = async (preferencesPayload: {
	teams: number[];
	sports: number[];
}) => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ preferences: preferencesPayload }),
		});
		if (!response.ok) {
			throw new Error("Failed to update preferences!");
		}
	} catch (error) {
		console.error(error);
	}
};
