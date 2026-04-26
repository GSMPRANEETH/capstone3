import { API_ENDPOINT } from "../utls/constants";

export interface UserPayload {
	id: number;
	name: string;
	email: string;
}

export interface PasswordPayload {
	current_password: string;
	new_password: string;
}

export const getUserDetails = async (): Promise<UserPayload> => {
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
	return response.json();
};

export const updateUserPassword = async (
	data: PasswordPayload
): Promise<void> => {
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
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to change password!");
	}
};
