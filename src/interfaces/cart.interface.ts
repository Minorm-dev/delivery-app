import type {Product} from './product.interface';

export interface CartItem {
    id: number;
    product: Product;
    count: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}