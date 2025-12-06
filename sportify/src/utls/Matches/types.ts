import {Teams} from "../Articles/types";

export interface MatchesPayload {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt: string;
    isRunning: boolean;
    teams: Teams[];
}