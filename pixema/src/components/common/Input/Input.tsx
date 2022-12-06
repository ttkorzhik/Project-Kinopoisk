import React, {FC} from 'react';

import {useTheme} from "../../../context/ThemeContext";
import {InputProps, InputVariants} from "./interfaces";

import styles from "./Input.module.css";

const Input: FC<InputProps> = (
    {
        id= "",
        title = "",
        type = "text",
        value= "",
        onChange = () => {},
        name = "",
        disabled= false,
        placeholder = "",
        error= {text: null, error: false},
        variant = InputVariants.forSearch,
        className= ""
    }) => {

    const {isLightTheme, isDarkTheme} = useTheme();

    return (
        <div className={styles.inputWrapper}>
            <label className={`${styles.label} ${isLightTheme && className}`} htmlFor={id}>
                {title}
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${
                                  variant === InputVariants.primary && isDarkTheme ? styles.inputPrimary :
                                  variant === InputVariants.primary && isLightTheme ? styles.inputPrimaryLight :
                                  variant === InputVariants.forSearch && isDarkTheme ? styles.inputForSearch : 
                                  variant === InputVariants.forSearch && isLightTheme ? styles.inputForSearchLight :
                                  variant === InputVariants.forNumbersSort && isDarkTheme ? styles.forNumbersSort :
                                  variant === InputVariants.forNumbersSort && isLightTheme ? styles.forNumbersSortLight :
                                  variant === InputVariants.forNumbersSortSecond && isDarkTheme ? styles.forNumbersSortSecond :
                                  variant === InputVariants.forNumbersSortSecond && isLightTheme ? styles.forNumbersSortSecondLight : styles.default
                                }        
                                ${error?.error ? styles.error : styles.input}
                                ${className} 
                    `}
                />
            </label>
            {error?.error && <p className={styles.errorMessage}>{error.text}</p>}
        </div>
    );
};

export default Input;