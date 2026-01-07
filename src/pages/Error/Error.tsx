import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Error.module.css';

export function Error() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className={styles['not-found-container']}>
            <div className={styles['stars']}></div>

            <div className={styles['central-body']}>
                <svg className={styles['planet']} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="#4ecdc4" />
                    <circle cx="35" cy="40" r="10" fill="#ff6b6b" opacity="0.8" />
                    <circle cx="65" cy="60" r="8" fill="#ffd166" opacity="0.7" />
                    <circle cx="25" cy="70" r="6" fill="#6a0572" opacity="0.6" />
                </svg>

                <h1 className={styles['error-code']}>404</h1>
                <h2 className={styles['error-title']}>Ой! Страница не найдена</h2>

                <p className={styles['error-message']}>
                    Похоже, что страница, которую вы ищете, отправилась в космическое путешествие.
                    Возможно, она была перемещена, удалена или никогда не существовала в нашей галактике.
                </p>

                <div className={styles['redirect-info']}>
                    Автоматический возврат на главную страницу через
                    <span className={styles['countdown']}> {countdown} </span>
                    секунд
                </div>

                <div className={styles['buttons-container']}>
                    <button
                        className={styles['home-button']}
                        onClick={() => navigate('/')}
                    >
                        <svg className={styles['button-icon']} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        На главную
                    </button>

                    <button
                        className={styles['back-button']}
                        onClick={() => navigate(-1)}
                    >
                        <svg className={styles['button-icon']} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Назад
                    </button>
                </div>

                <div className={styles['astronaut-container']}>
                    <div className={styles['astronaut']}>
                        <div className={styles['helmet']}></div>
                        <div className={styles['body']}></div>
                        <div className={styles['left-arm']}></div>
                        <div className={styles['right-arm']}></div>
                        <div className={styles['left-leg']}></div>
                        <div className={styles['right-leg']}></div>
                    </div>
                </div>
            </div>

            <div className={styles['objects']}>
                <div className={styles['object_rocket']}>
                    <div className={styles['rocket-body']}>
                        <div className={styles['rocket-window']}></div>
                        <div className={styles['rocket-fin-left']}></div>
                        <div className={styles['rocket-fin-right']}></div>
                    </div>
                    <div className={styles['rocket-fire']}></div>
                </div>
            </div>
        </div>
    );
}

export default Error;