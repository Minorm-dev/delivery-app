import styles from './Search.module.css';
import {forwardRef} from "react";
import cn from 'classnames';
import type {SearchProps} from "./Search.props.ts";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({isValid = true, className, ...props}, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input ref={ref} className={cn(styles['input'],className, {
                [styles['invalid']]: isValid
            })} {...props} />
            <img className={styles['icon']} src='/search-icon.svg' alt="Search Icon"/>
        </div>
    );
});

export default Search;