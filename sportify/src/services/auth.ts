import { API_ENDPOINT } from "../utls/constants";

export interface AuthUser {
	id: number;
	name: string;
	email: string;
}

export interface AuthResponse {
	auth_token: string;
	user: AuthUser;
}

export const signInUser = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.message ||
				"Sign-in failed. Please check your credentials."
		);
	}
	return response.json();
};

export const createUser = async (
	name: string,
	email: string,
	password: string
): Promise<AuthResponse> => {
	const response = await fetch(`${API_ENDPOINT}/users`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.message ||
				"Sign-up failed. This email may already be registered."
		);
	}
	return response.json();
};
