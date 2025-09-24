import type { User } from './user';

export interface Entry {
	id: number;
	content: string;
	likes: number;
	date: string;
	user: User;
}
