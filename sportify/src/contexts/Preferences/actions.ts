import { API_ENDPOINT } from "../../utls/constants";

export const getUserPreferences = async (dispatch: any) => {
	try {
		dispatch({ type: "GET_PREFERENCES_REQUEST" });
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
		dispatch({ type: "GET_PREFERENCES_SUCCESS", payload: data.preferences });
		return data.preferences;
	} catch (error) {
		console.error(error);
		dispatch({
			type: "GET_PREFERENCES_FAILURE",
			payload: (error as Error).message,
		});
	}
};

export const updateUserPreferences = async (
	dispatch: any,
	preferencesPayload: {
		teams: number[];
		sports: number[];
	}
) => {
	try {
		dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });
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
		const data = await response.json();
		dispatch({ type: "UPDATE_PREFERENCES_SUCCESS", payload: data.preferences });
		console.log("Preferences updated:", data.preferences);
	} catch (error) {
		console.error(error);
		dispatch({
			type: "UPDATE_PREFERENCES_FAILURE",
			payload: (error as Error).message,
		});
	}
};
