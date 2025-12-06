interface Sport {
	id: number;
	name: string;
}
export interface Teams {
	id: number;
	name: string;
}
export interface ArticlesPayload {
	id: number;
	title: string;
	thumbnail: string;
	sport: Sport;
	date: string;
	summary: string;
	teams: Teams[];
}
