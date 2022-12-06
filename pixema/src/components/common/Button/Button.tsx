import React, {FC, MouseEventHandler, ReactNode} from 'react';

import {useTheme} from "../../../context/ThemeContext";

import styles from "./Button.module.css";

export enum BtnVariants {
    primary = "primary",
    secondary = "secondary",
    forIcon = "forIcon",
    forPagination = "forPagination",
    forSelectedFilm = "forSelectedFilm"
}

export enum ButtonTypeProps {
    button = "button",
    submit = "submit",
    reset = "reset"
}

export interface ButtonProps {
    id?: string | undefined
    variant?: BtnVariants
    children: ReactNode
    type?: ButtonTypeProps
    onClick?: MouseEventHandler
    disabled?: boolean
    className?: string
}

const Button: FC<ButtonProps> = (
    {
        variant,
        type= ButtonTypeProps.button,
        children,
        onClick= () => {},
        disabled = false,
        className= '',
        id
    }) => {

    const {isLightTheme, isDarkTheme} = useTheme();

    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${
                    variant === BtnVariants.primary ? styles.primary : 
                    variant === BtnVariants.secondary && isDarkTheme ? styles.secondary :
                    variant === BtnVariants.secondary && isLightTheme ? styles.secondaryLight :
                    variant === BtnVariants.forIcon ? styles.forIcon :
                    variant === BtnVariants.forPagination && isLightTheme ? styles.forPaginationLight :
                    variant === BtnVariants.forPagination && isDarkTheme ? styles.forPagination :
                    variant === BtnVariants.forSelectedFilm ? styles.forSelectedFilm : styles.default
                }
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;