import { ArticlesActions } from "./reducer";

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
	content: string;
}

export type ArticleWithContent = ArticlesPayload & { content: string };

export interface ArticlesState {
	articles: ArticlesPayload[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}
export type ArticlesDispatch = React.Dispatch<ArticlesActions>;
