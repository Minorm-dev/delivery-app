export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
}

// Mock data
export const users: User[] = [
	{
		id: 1,
		email: 'test@example.com',
		password: 'password123',
		name: 'Тестовый Пользователь',
	},
	{
		id: 2,
		email: 'admin@example.com',
		password: 'admin123',
		name: 'Администратор',
	},
	{
		id: 3,
		email: 'user@example.com',
		password: 'user123',
		name: 'Обычный Пользователь',
	},
];