export type User = {
	id: string;
	name: string;
};

export type Message = {
	id: string;
	userId: User['id'];
	text: string;
	createdAt: string; // Datetime in ISO 8601 format
};
