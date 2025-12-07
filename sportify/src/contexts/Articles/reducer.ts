import { ArticlesPayload, ArticlesState, ArticleWithContent } from "./types";

export const articleState: ArticlesState = {
	articles: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export type ArticlesActions =
	| { type: "LIST_ARTICLES_REQUEST" }
	| { type: "LIST_ARTICLES_SUCCESS"; payload: ArticlesPayload[] }
	| { type: "LIST_ARTICLES_FAILURE"; payload: string };

export const reducer = (
	state: ArticlesState = articleState,
	action: ArticlesActions
): ArticlesState => {
	switch (action.type) {
		case "LIST_ARTICLES_REQUEST":
			return { ...state, isLoading: true };
		case "LIST_ARTICLES_SUCCESS":
			return { ...state, isLoading: false, articles: action.payload };
		case "LIST_ARTICLES_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};
