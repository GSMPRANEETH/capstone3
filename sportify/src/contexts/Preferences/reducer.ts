import { PreferencesPayload, PreferencesState } from "./types";

export const preferencesState: PreferencesState = {
	preferences: {
		teams: [],
		sports: [],
	},
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export type PreferencesActions =
	| { type: "UPDATE_PREFERENCES_REQUEST" }
	| { type: "UPDATE_PREFERENCES_SUCCESS"; payload: PreferencesPayload }
	| { type: "UPDATE_PREFERENCES_FAILURE"; payload: string }
	| { type: "GET_PREFERENCES_REQUEST" }
	| { type: "GET_PREFERENCES_SUCCESS"; payload: PreferencesPayload }
	| { type: "GET_PREFERENCES_FAILURE"; payload: string };

export const reducer = (
	state: PreferencesState = preferencesState,
	action: PreferencesActions
): PreferencesState => {
	switch (action.type) {
		case "UPDATE_PREFERENCES_REQUEST":
			return { ...state, isLoading: true };
		case "UPDATE_PREFERENCES_SUCCESS":
			return { ...state, isLoading: false, preferences: action.payload };
		case "UPDATE_PREFERENCES_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		case "GET_PREFERENCES_REQUEST":
			return { ...state, isLoading: true };
		case "GET_PREFERENCES_SUCCESS":
			return { ...state, isLoading: false, preferences: action.payload };
		case "GET_PREFERENCES_FAILURE":
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
