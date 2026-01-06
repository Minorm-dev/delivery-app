import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';
import { cartRouter } from './routes/cart.js';
import { authRouter } from './routes/auth.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});