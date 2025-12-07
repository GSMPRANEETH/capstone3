import { API_ENDPOINT } from "../../utls/constants";

export const listArticles = async (dispatch: any) => {
	try {
		dispatch({ type: "LIST_ARTICLES_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/articles`, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch articles!");
		}
		const data = await response.json();
		dispatch({ type: "LIST_ARTICLES_SUCCESS", payload: data });
	} catch (error) {
		dispatch({
			type: "LIST_ARTICLES_FAILURE",
			payload: (error as Error).message,
		});
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
