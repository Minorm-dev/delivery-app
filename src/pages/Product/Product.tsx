import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {productAPI, getErrorMessage} from "../../helpers/API.ts";
import type {Product} from "../../interfaces/product.interface.ts";

export function Product() {
    const {id} = useParams();
    // const data = useLoaderData() as Product;
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return (
            <div style={{color: 'red', padding: '20px', textAlign: 'center'}}>
                <p>{error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        const fetchProduct = async () => {
                            if (!id) return;
                            try {
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
                        fetchProduct();
                    }}
                    style={{marginTop: '10px', padding: '8px 16px'}}
                >
                    Повторить попытку
                </button>
            </div>
        );
    }

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            {/*Product - {data.id}*/}
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} style={{maxWidth: '300px'}}/>
            <p>Цена: {product.price} ₽</p>
            <p>Рейтинг: {product.rating}</p>
            <p>Ингредиенты: {product.ingredients.join(', ')}</p>
        </div>
    );
}