import React, {FC} from 'react';

import {WithChildren} from "../../../types/withChildren";
import {useTheme} from "../../../context/ThemeContext";

import TitleAuth from "./TitleAuth/TitleAuth";

import styles from "./AuthWrapper.module.css"

interface AuthWrapperProps {
    title?: string
}

const AuthWrapper: FC<AuthWrapperProps & WithChildren> = ({children, title}) => {
    const { isLightTheme } = useTheme();
    return (
        <div className={`${styles.wrapper} ${isLightTheme && styles.light}`}>
            {!!title && <TitleAuth text={title} />}
            {children}
        </div>
    );
};

export default AuthWrapper;