import { Teams } from "../../contexts/Articles/types";
import { MatchesActions } from "./reducer";

export interface MatchesPayload {
	id: number;
	name: string;
	location: string;
	sportName: string;
	endsAt: string;
	isRunning: boolean;
	teams: Teams[];
}

export interface MatchesState {
	matches: MatchesPayload[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export type MatchesDispatch = React.Dispatch<MatchesActions>;
