import { API_ENDPOINT } from "../../utls/constants";
import { PasswordPayload } from "./types";

export const getUserDetails = async () => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await fetch(`${API_ENDPOINT}/user`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user details!");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const updateUserPassword = async (data: PasswordPayload) => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await fetch(`${API_ENDPOINT}/user/password`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Failed to change password!");
		}
	} catch (error) {
		console.error(error);
	}
};
