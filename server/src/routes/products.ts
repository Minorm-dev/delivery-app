import { Router } from 'express';
import { products } from '../data/products.js';

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
	res.json(products);
});

productsRouter.get('/search', (req, res) => {
	const query = (req.query.q as string)?.toLowerCase() || '';

	if (!query) {
		return res.json(products);
	}

	const filtered = products.filter(product =>
		product.name.toLowerCase().includes(query) ||
		product.ingredients.some(ingredient =>
			ingredient.toLowerCase().includes(query)
		)
	);

	res.json(filtered);
});

productsRouter.get('/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const product = products.find(p => p.id === id);

	if (!product) {
		return res.status(404).json({ error: 'Продукт не найден' });
	}

	res.json(product);
});