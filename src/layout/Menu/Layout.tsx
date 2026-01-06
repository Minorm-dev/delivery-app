import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './Layout.module.css';
import Button from "../../components/ui/button/Button.tsx";
import cn from "classnames";
import {authAPI} from "../../helpers/API.ts";
import type {User} from "../../interfaces/user.interface.ts";

export function Layout() {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authAPI.getMe();
                setUser(userData);
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        authAPI.logout();
        navigate('/auth/login');
    }

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <NavLink to="/profile" className={styles['user']}>
                    <img className={styles['avatar']} src="/avatar.png" alt="User Avatar" height="90px" width="90px"/>
                    {isLoading ? (
                        <>
                            <div className={styles['name']}>Загрузка...</div>
                            <div className={styles['email']}>...</div>
                        </>
                    ) : user ? (
                        <>
                            <div className={styles['name']}>{user.name}</div>
                            <div className={styles['email']}>{user.email}</div>
                        </>
                    ) : (
                        <>
                            <div className={styles['name']}>Пользователь</div>
                            <div className={styles['email']}>Не загружено</div>
                        </>
                    )}
                </NavLink>
                <div className={'menu'}>
                    <NavLink to={'/'} className={({isActive}) => cn(styles['link'], {
                        [styles.active]: isActive
                    })}>
                        <img src="/menu-icon.svg" alt="Menu Icon"/>
                        Меню</NavLink>
                    <NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
                        [styles.active]: isActive
                    })}>
                        <img src="/cart-icon.svg" alt="Cart Icon" height="20px"/>
                        Корзина</NavLink>
                </div>
                <Button className={styles['exit']} onClick={() => logout()}>
                    <img src="/logout-icon.svg" alt="Logout Icon" height="26px" width="26px"/>
                    Выход
                </Button>
            </div>
            <div className={styles['content']}>
                <Outlet/>
            </div>
        </div>
    );
}