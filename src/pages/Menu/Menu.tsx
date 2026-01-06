import Headling from "../../components/Headling/Headling.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from "./Menu.module.css"
import {productAPI, getErrorMessage} from "../../helpers/API.ts";
import type {Product} from "../../interfaces/product.interface.ts";
import {useEffect, useState, useRef} from "react";
import {MenuList} from "./MenuList/MenuList.tsx";

export function Menu() {

    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchTimeoutRef = useRef<number | null>(null);

    const getMenu = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await productAPI.getAll();
            setProducts(data);
            setAllProducts(data);
        } catch (error) {
            console.error('Ошибка при загрузке меню:', error);
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const performSearch = async (query: string) => {
        const trimmedQuery = query.trim();
        
        if (!trimmedQuery) {
            if (allProducts.length > 0) {
                setProducts(allProducts);
            }
            setIsSearching(false);
            return;
        }

        try {
            setIsSearching(true);
            setError(null);
            const data = await productAPI.search(trimmedQuery);
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при поиске:', error);
            setError(getErrorMessage(error));
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (searchTimeoutRef.current !== null) {
            window.clearTimeout(searchTimeoutRef.current);
            searchTimeoutRef.current = null;
        }

        if (!query.trim()) {
            setProducts(allProducts.length > 0 ? allProducts : products);
            setIsSearching(false);
            return;
        }

        searchTimeoutRef.current = window.setTimeout(() => {
            performSearch(query);
        }, 300);
    };

    useEffect(() => {
        getMenu();

        return () => {
            if (searchTimeoutRef.current) {
                window.clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search 
                    placeholder='Введите блюдо или состав'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            {(isLoading || isSearching) && <div>Загрузка...</div>}
            {error && (
                <div style={{color: 'red', padding: '20px', textAlign: 'center'}}>
                    <p>{error}</p>
                    <button onClick={getMenu} style={{marginTop: '10px', padding: '8px 16px'}}>
                        Повторить попытку
                    </button>
                </div>
            )}
            {!isLoading && !isSearching && !error && (
                <>
                    {products.length === 0 ? (
                        <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-secondary-color)'}}>
                            {searchQuery ? 'Ничего не найдено' : 'Товары не найдены'}
                        </div>
                    ) : (
                        <MenuList products={products}/>
                    )}
                </>
            )}
        </>
    );
}

export default Menu;