import { MatchesPayload, MatchesState } from "./types";

export const matchesState: MatchesState = {
	matches: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export type MatchesActions =
	| { type: "LIST_MATCHES_REQUEST" }
	| { type: "LIST_MATCHES_SUCCESS"; payload: MatchesPayload[] }
	| { type: "LIST_MATCHES_FAILURE"; payload: string };

export const reducer = (
	state: MatchesState = matchesState,
	action: MatchesActions
): MatchesState => {
	switch (action.type) {
		case "LIST_MATCHES_REQUEST":
			return { ...state, isLoading: true };
		case "LIST_MATCHES_SUCCESS":
			return { ...state, isLoading: false, matches: action.payload };
		case "LIST_MATCHES_FAILURE":
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
