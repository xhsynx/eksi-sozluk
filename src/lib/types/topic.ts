import type { Entry } from './entry';

export interface Topic {
	id: number;
	title: string;
	content: string;
	date: string;
	likes: number;
	entries: Entry[];
}

export interface TopicListResponse {
	topics: Topic[];
	total: number;
	page: number;
	pageSize: number;
}
