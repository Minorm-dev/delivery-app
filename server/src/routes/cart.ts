import { Router } from 'express';
import { products } from '../data/products.js';

export const cartRouter = Router();

let cart: {
	id: number;
	productId: number;
	count: number;
}[] = [];

let cartItemIdCounter = 1;

cartRouter.get('/', (req, res) => {
	const cartItems = cart
		.map(item => {
			const product = products.find(p => p.id === item.productId);
			if (!product) {
				return null;
			}
			return {
				id: item.id,
				product,
				count: item.count,
			};
		})
		.filter((item): item is { id: number; product: typeof products[0]; count: number } => item !== null);

	const total = cartItems.reduce((sum, item) => {
		return sum + item.product.price * item.count;
	}, 0);

	res.json({
		items: cartItems,
		total,
	});
});

cartRouter.post('/items', (req, res) => {
	const { productId, count = 1 } = req.body;

	if (!productId || count < 1) {
		return res.status(400).json({ error: 'Неверные параметры' });
	}

	const product = products.find(p => p.id === productId);
	if (!product) {
		return res.status(404).json({ error: 'Продукт не найден' });
	}

	const existingItem = cart.find(item => item.productId === productId);

	if (existingItem) {
		existingItem.count += count;
		res.json({
			id: existingItem.id,
			product,
			count: existingItem.count,
		});
	} else {
		const newItem = {
			id: cartItemIdCounter++,
			productId,
			count,
		};
		cart.push(newItem);
		res.json({
			id: newItem.id,
			product,
			count: newItem.count,
		});
	}
});

cartRouter.put('/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const { count } = req.body;

	if (!count || count < 0) {
		return res.status(400).json({ error: 'Неверное количество' });
	}

	const item = cart.find(i => i.id === id);
	if (!item) {
		return res.status(404).json({ error: 'Товар в корзине не найден' });
	}

	if (count === 0) {
		cart = cart.filter(i => i.id !== id);
		return res.status(204).send();
	}

	item.count = count;
	const product = products.find(p => p.id === item.productId);

	res.json({
		id: item.id,
		product,
		count: item.count,
	});
});

cartRouter.delete('/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const itemIndex = cart.findIndex(i => i.id === id);

	if (itemIndex === -1) {
		return res.status(404).json({ error: 'Товар в корзине не найден' });
	}

	cart.splice(itemIndex, 1);
	res.status(204).send();
});

cartRouter.delete('/', (req, res) => {
	cart = [];
	cartItemIdCounter = 1;
	res.status(204).send();
});