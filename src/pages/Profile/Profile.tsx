import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Headling from "../../components/Headling/Headling.tsx";
import Button from "../../components/ui/button/Button.tsx";
import {authAPI, getErrorMessage} from "../../helpers/API.ts";
import type {User} from "../../interfaces/user.interface.ts";
import styles from "./Profile.module.css";

export function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const userData = await authAPI.getMe();
                setUser(userData);
            } catch (err) {
                console.error('Ошибка при загрузке профиля:', err);
                const errorMessage = getErrorMessage(err);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        authAPI.logout();
        navigate('/auth/login');
    };

    if (isLoading) {
        return (
            <div className={styles['profile']}>
                <Headling>Профиль</Headling>
                <div>Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles['profile']}>
                <Headling>Профиль</Headling>
                <div className={styles['error']}>{error}</div>
                <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles['profile']}>
                <Headling>Профиль</Headling>
                <div>Пользователь не найден</div>
            </div>
        );
    }

    return (
        <div className={styles['profile']}>
            <Headling>Профиль</Headling>
            <div className={styles['content']}>
                <div className={styles['avatar-section']}>
                    <img 
                        className={styles['avatar']} 
                        src="/avatar.png" 
                        alt="User Avatar" 
                        width="120" 
                        height="120"
                    />
                </div>
                <div className={styles['info']}>
                    <div className={styles['field']}>
                        <div className={styles['label']}>Имя:</div>
                        <div className={styles['value']}>{user.name}</div>
                    </div>
                    <div className={styles['field']}>
                        <div className={styles['label']}>Email:</div>
                        <div className={styles['value']}>{user.email}</div>
                    </div>
                    {/*<div className={styles['field']}>*/}
                    {/*    <div className={styles['label']}>ID:</div>*/}
                    {/*    <div className={styles['value']}>{user.id}</div>*/}
                    {/*</div>*/}
                </div>
                <div className={styles['actions']}>
                    <Button appearance='big' onClick={handleLogout}>
                        Выйти из аккаунта
                    </Button>
                </div>
            </div>
        </div>
    );
}