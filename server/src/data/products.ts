export interface Product {
	id: number;
	name: string;
	price: number;
	ingredients: string[];
	image: string;
	rating: number;
}


// Mock data
export const products: Product[] = [
	{
		id: 1,
		name: 'Пицца Маргарита',
		price: 450,
		ingredients: ['тесто', 'томатный соус', 'моцарелла', 'базилик'],
		image: '/products/margarita.png',
		rating: 4.5,
	},
	{
		id: 2,
		name: 'Пицца Пепперони',
		price: 550,
		ingredients: ['тесто', 'томатный соус', 'моцарелла', 'пепперони'],
		image: '/products/pizza-pepperoni.png',
		rating: 4.8,
	},
	{
		id: 3,
		name: 'Бургер Классический',
		price: 350,
		ingredients: ['булочка', 'говядина', 'салат', 'помидор', 'лук', 'соус'],
		image: '/products/burger-classic.png',
		rating: 4.3,
	},
	{
		id: 4,
		name: 'Салат Цезарь',
		price: 280,
		ingredients: ['салат', 'курица', 'сыр пармезан', 'сухарики', 'соус цезарь'],
		image: '/products/caesar-salad.png',
		rating: 4.6,
	},
	{
		id: 5,
		name: 'Паста Карбонара',
		price: 420,
		ingredients: ['паста', 'бекон', 'сливки', 'сыр пармезан', 'яйцо'],
		image: '/products/carbonara.png',
		rating: 4.7,
	},
	{
		id: 6,
		name: 'Суши сет',
		price: 890,
		ingredients: ['рис', 'лосось', 'тунец', 'угорь', 'авокадо', 'нори'],
		image: '/products/sushi-set.png',
		rating: 4.9,
	},
];