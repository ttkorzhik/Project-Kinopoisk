import React, {FC} from 'react';

import {useTheme} from "../../../context/ThemeContext";

import styles from "../Title/Title.module.css";

export enum TitleVariants {
    big = "big",
    small = "small",
    main = "main"
}

export interface TitleProps {
    text: string
    variant: TitleVariants
    className?: string
}

const Title: FC<TitleProps> = ({text, variant, className}) => {
    const { isLightTheme } = useTheme();
    return (
        <h3 className={`${variant === TitleVariants.big ? styles.big :
                          variant === TitleVariants.small ? styles.small : 
                          variant === TitleVariants.main && isLightTheme ? styles.mainLight : styles.main} 
                        ${className}`}
        >
            {text}
        </h3>
    );
};

export default Title;