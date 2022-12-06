import React, {FC, useMemo} from 'react';
import {Link} from "react-router-dom";

import {useTheme} from "../../../context/ThemeContext";
import {Routes} from '../../../constants/routes';
import {InputProps} from "../Input/interfaces";

import Input from "../Input/Input";
import Button, {BtnVariants} from "../Button/Button";

import styles from "./AuthForm.module.css";

export interface IAuthForm {
    page: Routes
    topText?: string
    inputs?: InputProps[]
    actionButton: {
        title: string
        onSubmit?: () => void
    }
}

const AuthForm: FC<IAuthForm> = (
    {
        page,
        topText = "",
        inputs = [],
        actionButton
    }) => {

    const {isLightTheme, isDarkTheme} = useTheme();

    const isSignIn = useMemo(() => page === Routes.signIn, [page]);
    const isSignUp = useMemo(() => page === Routes.signUp, [page]);

    return (
        <form className={styles.form}>
            {!!topText && <p
                className={`${styles.topText} ${isLightTheme && styles.light}`}
                dangerouslySetInnerHTML={{__html: topText}}
            />}
            {inputs.map(input => <Input
                className={`${isDarkTheme ? styles.formInput : styles.lightFormInput}`}
                key={input.id}
                {...input}
            />)}
            {isSignIn && (
                <Link
                    to={Routes.resetPasswordPage}
                    className={`${styles.forgotPassword} ${isLightTheme && styles.light}`}
                >
                    Forgot password?
                </Link>
            )}
            <Button onClick={actionButton.onSubmit} variant={BtnVariants.primary} className={styles.submitButton}>
                {actionButton.title}
            </Button>
            {(isSignIn || isSignUp) && (
                <div className={styles.bottomText}>
                    <p className={styles.text}>
                        {isSignIn ? "Don’t have an account?" : "Already have an account?"}
                        <Link
                            to={isSignIn ? Routes.signUp : Routes.signIn}
                            className={styles.link}
                        >
                            {isSignIn ? " Sign Up" : " Sign In"}
                        </Link>
                    </p>
                </div>
            )}
        </form>
    )
};

export default AuthForm;