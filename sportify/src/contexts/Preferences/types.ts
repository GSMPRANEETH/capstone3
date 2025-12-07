import { PreferencesActions } from "./reducer";

export interface PreferencesPayload {
	teams: number[];
	sports: number[];
}

export interface PreferencesState {
	preferences: PreferencesPayload;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;
