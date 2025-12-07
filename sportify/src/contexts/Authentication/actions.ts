import { API_ENDPOINT } from "../../utls/constants";

export const signInUser = async (email: string, password: string) => {
	try {
		const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			throw new Error("Sign-in failed!");
		}
		const data = await response.json();
		localStorage.setItem("authToken", data.auth_token);
		localStorage.setItem("userData", JSON.stringify(data.user));
	} catch (error) {
		console.error(error);
	}
};

export const createUser = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const response = await fetch(`${API_ENDPOINT}/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		});

		if (!response.ok) {
			throw new Error("Sign-up failed");
		}
		const data = await response.json();
		localStorage.setItem("authToken", data.auth_token);
		localStorage.setItem("userData", JSON.stringify(data.user));
	} catch (error) {
		console.error("Sign-up failed:", error);
	}
};
