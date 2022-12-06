import React, {FC} from 'react';

import {useTheme} from "../../../../context/ThemeContext";

import styles from "./TitleAuth.module.css";

interface TitleAuthProps {
    text: string
}

const TitleAuth: FC<TitleAuthProps> = ({text}) => {
    const { isLightTheme } = useTheme();
    return (
        <h2 className={`${styles.title} ${isLightTheme && styles.light}`}>
            {text}
        </h2>
    );
};

export default TitleAuth;