import Headling from "../../components/Headling/Headling.tsx";
import Input from "../../components/ui/input/Input.tsx";
import Button from "../../components/ui/button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Login.module.css"
import {type FormEvent, useState} from "react";
import {authAPI, getErrorMessage} from "../../helpers/API.ts";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Login() {

    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(undefined);
        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;
        await sendLogin(email.value, password.value);
    }

    const sendLogin = async (email:string, password:string) => {
        try {
            const data = await authAPI.login(email, password);
            console.log('Успешный вход:', data);
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

    return <div className={styles['login']}>
        <Headling>Вход</Headling>
        {error && <div className={styles['error']}>{error}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor="email">Ваш email</label>
                <Input id='email' name='email' placeholder='Email'/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="password">Ваш пароль</label>
                <Input id='password' name='password' type='password' placeholder='Пароль'/>
            </div>
            <Button appearance='big'>Вход</Button>
        </form>
        <div className={styles['links']}>
            <div>Нет аккаунта?</div>
            <Link to={'/auth/register'}>Зарегистрироваться</Link>
        </div>
    </div>
}