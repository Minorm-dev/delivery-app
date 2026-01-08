import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productAPI, getErrorMessage } from "../../helpers/API.ts";
import type { Product } from "../../interfaces/product.interface.ts";
import styles from "./Product.module.css";

export function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            setError(null);
            const productId = parseInt(id, 10);
            const data = await productAPI.getById(productId);
            setProduct(data);
        } catch (error) {
            console.error('Ошибка при загрузке продукта:', error);
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <button
                    onClick={fetchProduct}
                    className={styles.retryButton}
                >
                    Повторить попытку
                </button>
            </div>
        );
    }

    if (!product) {
        return <div className={styles.notFound}>Продукт не найден</div>;
    }

    return (
        <div className={styles.product}>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={styles.image}
                />
            </div>
            <div className={styles.details}>
                <p className={styles.price}>Цена: {product.price} ₽</p>
                <p className={styles.rating}>Рейтинг: {product.rating}&nbsp;★</p>
                <div className={styles.ingredients}>
                    <h3>Ингредиенты:</h3>
                    <p>{product.ingredients.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}