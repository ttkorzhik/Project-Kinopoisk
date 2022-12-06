import React, {FC} from 'react';

import {InputProps, InputVariants} from "../../../Input/interfaces";

import Input from "../../../../common/Input/Input";
import Button from "../../../Button/Button";

import styles from "./SearchForm.module.css";

const SearchForm: FC<InputProps> = (
    {
        id= "",
        onClick,
        type = "text",
        value= "",
        onChange,
        name = "",
        disabled= false,
        placeholder = "",
        onSubmit,
        filter = false,
    }) => {
    return (
        <div className={styles.searchInputWrapper}>
            <form className={`${styles.searchInputWrapper}`} onSubmit={onSubmit}>
                <Input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    variant={InputVariants.forSearch}
                />
            </form>
            <Button className={styles.filter} onClick={onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L19 6M10 12H19M14 18H19" stroke="white" strokeWidth="2" strokeLinecap="round" className={styles.svg} />
                    {filter && <circle cx="3" cy="19" r="3" fill="#7B61FF"/>}
                </svg>
            </Button>
        </div>
    );
};

export default SearchForm;