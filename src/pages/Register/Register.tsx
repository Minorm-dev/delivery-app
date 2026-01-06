import Headling from "../../components/Headling/Headling.tsx";
import Input from "../../components/ui/input/Input.tsx";
import Button from "../../components/ui/button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Register.module.css";
import {type FormEvent, useState} from "react";
import {authAPI, getErrorMessage} from "../../helpers/API.ts";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
}

export function Register() {

    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(undefined);
        const target = e.target as typeof e.target & RegisterForm;
        const {email, password, name} = target;
        await sendRegister(email.value, password.value, name.value);
    }

    const sendRegister = async (email: string, password: string, name: string) => {
        try {
            const data = await authAPI.register({
                email,
                password,
                name,
            });
            console.log('Успешная регистрация:', data);
            navigate('/');
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { data?: { error?: string; message?: string } } };
                const serverError = axiosError.response?.data?.error || axiosError.response?.data?.message;
                setError(serverError || errorMessage);
            } else {
                setError(errorMessage);
            }
        }
    }

    return <div className={styles['register']}>
        <Headling>Регистрация</Headling>
        {error && <div className={styles['error']}>{error}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor="name">Ваше имя</label>
                <Input id='name' name='name' placeholder='Имя' required/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="email">Ваш email</label>
                <Input id='email' name='email' type='email' placeholder='Email' required/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="password">Ваш пароль</label>
                <Input id='password' name='password' type='password' placeholder='Пароль' required/>
            </div>
            <Button appearance='big'>Зарегистрироваться</Button>
        </form>
        <div className={styles['links']}>
            <div>Уже есть аккаунт?</div>
            <Link to={'/auth/login'}>Войти</Link>
        </div>
    </div>
}