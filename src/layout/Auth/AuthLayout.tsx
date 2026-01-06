import {Outlet} from "react-router-dom";
import styles from './AuthLayout.module.css';

export function AuthLayout() {
    return (
        <div className={styles['layout']}>
            <div className={styles['logo']}>
                <img src="/vite-logo.svg" alt="Logo" width="200px" height="200px"/>
            </div>
            <div className={styles['content']}>
                <Outlet/>
            </div>
        </div>
    );
}