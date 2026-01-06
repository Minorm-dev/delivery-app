import {useEffect, useState} from "react";
import axios from "axios";
import {cartAPI, getErrorMessage} from "../../helpers/API.ts";
import type {Cart} from "../../interfaces/cart.interface.ts";
import Headling from "../../components/Headling/Headling.tsx";
import styles from "./Cart.module.css";

export function Cart() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await cartAPI.get();
            setCart(data);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error);
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setCart({ items: [], total: 0 });
            } else {
                setError(getErrorMessage(error));
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateItem = async (itemId: number, count: number) => {
        if (count < 1) {
            await handleRemoveItem(itemId);
            return;
        }
        
        try {
            await cartAPI.updateItem(itemId, count);
            await fetchCart();
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error);
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await cartAPI.removeItem(itemId);
            await fetchCart();
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
    };

    if (isLoading) {
        return (
            <div className={styles['cart']}>
                <Headling>Корзина</Headling>
                <div className={styles['loading']}>Загрузка корзины...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles['cart']}>
                <Headling>Корзина</Headling>
                <div className={styles['error']}>{error}</div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className={styles['cart']}>
                <Headling>Корзина</Headling>
                <div className={styles['empty']}>
                    <div className={styles['emptyTitle']}>Корзина пуста</div>
                    <div className={styles['emptyText']}>Добавьте товары из меню, чтобы они появились здесь</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['cart']}>
            <div className={styles['head']}>
                <Headling>Корзина</Headling>
            </div>
            <div className={styles['items']}>
                {cart.items.map(item => (
                    <div key={item.id} className={styles['item']}>
                        <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className={styles['itemImage']}
                        />
                        <div className={styles['itemInfo']}>
                            <div className={styles['itemName']}>{item.product.name}</div>
                            <div className={styles['itemDescription']}>
                                {item.product.ingredients.join(', ')}
                            </div>
                            <div className={styles['itemPrice']}>
                                {item.product.price} ₽ за шт.
                            </div>
                        </div>
                        <div className={styles['itemControls']}>
                            <div className={styles['itemTotal']}>
                                {item.product.price * item.count} ₽
                            </div>
                            <div className={styles['quantityControls']}>
                                <button 
                                    className={styles['quantityButton']}
                                    onClick={() => handleUpdateItem(item.id, item.count - 1)}
                                    disabled={item.count <= 1}
                                >
                                    −
                                </button>
                                <span className={styles['quantity']}>{item.count}</span>
                                <button 
                                    className={styles['quantityButton']}
                                    onClick={() => handleUpdateItem(item.id, item.count + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                className={styles['removeButton']}
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles['summary']}>
                <div className={styles['summaryLabel']}>Итого:</div>
                <div className={styles['summaryTotal']}>{cart.total} ₽</div>
            </div>
        </div>
    );
}