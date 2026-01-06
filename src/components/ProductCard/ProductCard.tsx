import styles from './ProductCard.module.css'
import type {ProductCardProps} from "./ProductCard.props.ts";
import {Link} from "react-router-dom";
import {cartAPI} from "../../helpers/API.ts";
import {useState} from "react";

function ProductCard(props: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isAdding) return;
        
        try {
            setIsAdding(true);
            await cartAPI.addItem(props.id, 1);
            setShowSuccessMessage(true);
            setTimeout(() => { setShowSuccessMessage(false); }, 2000);
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>
                    <button
                        className={styles['add-to-card']}
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        title="Добавить в корзину"
                    >
                        {isAdding ? (
                            <span className={styles['spinner']}>...</span>
                        ) : (
                            <img src='/add-to-cart-icon.svg' alt="Add to cart"/>
                        )}
                    </button>
                    <div className={styles['rating']}>
                        {props.rating}&nbsp;★
                    </div>

                    {/* Сообщение об успешном добавлении */}
                    {showSuccessMessage && (
                        <div className={styles['success-message']}>
                            ✓ Добавлено в корзину
                        </div>
                    )}
                </div>
                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.name}</div>
                    <div className={styles['description']}>{props.description}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;