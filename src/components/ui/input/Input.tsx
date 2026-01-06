import styles from './Input.module.css';
import {forwardRef} from "react";
import cn from 'classnames';
import type {InputProps} from "./Input.props.ts";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({isValid = true, className, ...props}, ref) {
    return (
        <input ref={ref} className={cn(styles['input'],className, {
            [styles['invalid']]: isValid
        })} {...props} />
    );
});

export default Input;