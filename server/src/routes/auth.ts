import { Router } from 'express';
import { users } from '../data/users.js';

export const authRouter = Router();

// Тут простая токенизация в прод версии JWT!
const generateToken = (userId: number): string => {
	return `token_${userId}_${Date.now()}`;
};

authRouter.post('/register', (req, res) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({
			error: 'Все поля обязательны для заполнения',
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			error: 'Неверный формат email',
		});
	}

	if (password.length < 6) {
		return res.status(400).json({
			error: 'Пароль должен содержать минимум 6 символов',
		});
	}

	const existingUser = users.find(u => u.email === email);
	if (existingUser) {
		return res.status(409).json({
			error: 'Пользователь с таким email уже существует',
		});
	}

	const newUser = {
		id: users.length + 1,
		email,
		password,
		name,
	};

	users.push(newUser);

	const token = generateToken(newUser.id);

	res.status(201).json({
		access_token: token,
		user: {
			id: newUser.id,
			email: newUser.email,
			name: newUser.name,
		},
	});
});

authRouter.post('/login', (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: 'Email и пароль обязательны',
		});
	}

	const user = users.find(u => u.email === email);

	if (!user) {
		return res.status(401).json({
			error: 'Неверный email или пароль',
		});
	}

	if (user.password !== password) {
		return res.status(401).json({
			error: 'Неверный email или пароль',
		});
	}

	const token = generateToken(user.id);

	res.json({
		access_token: token,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
		},
	});
});

authRouter.get('/me', (req, res) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({
			error: 'Токен не предоставлен',
		});
	}

	const token = authHeader.substring(7);
	const tokenMatch = token.match(/^token_(\d+)_/);

	if (!tokenMatch) {
		return res.status(401).json({
			error: 'Неверный токен',
		});
	}

	const userId = parseInt(tokenMatch[1], 10);
	const user = users.find(u => u.id === userId);

	if (!user) {
		return res.status(401).json({
			error: 'Пользователь не найден',
		});
	}

	res.json({
		id: user.id,
		email: user.email,
		name: user.name,
	});
});