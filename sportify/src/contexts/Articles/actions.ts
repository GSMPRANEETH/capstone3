import { API_ENDPOINT } from "../../utls/constants";

export const listArticles = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}/articles`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch articles!");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const showArticle = async (articleID: string) => {
	const id = articleID;
	try {
		const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Sign-in failed!");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
