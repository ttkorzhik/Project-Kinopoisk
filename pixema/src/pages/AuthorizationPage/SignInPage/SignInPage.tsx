import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {InputError, InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";
import {useAuth} from "../../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";

import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

interface ISignInForm {
    email: string
    password: string
}

interface ISignInErrors {
    email: InputError
    password: InputError
}

const initialErrorValue = {text: null, error: false};

const initialSignInElementsError: ISignInErrors = {
    email: initialErrorValue,
    password: initialErrorValue,
};

const SignInPage: FC<PageProps> = ({title}) => {
    const navigate = useNavigate();

    const [signInForm, setSignInForm] = useState<ISignInForm>({email: "", password: ""});
    const [signInFieldsError, setSignInFieldsError] = useState<ISignInErrors>(initialSignInElementsError);

    const {auth, logInWithEmailAndPassword} = useAuth();
    const [user, loading] = useAuthState(auth);

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email}}): void => {
        setSignInForm(prevState => ({...prevState, email}));
        setSignInFieldsError(prevState => ({...prevState, email: initialErrorValue}));
    };

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password}}): void => {
        setSignInForm(prevState => ({...prevState, password}));
        setSignInFieldsError(prevState => ({...prevState, password: initialErrorValue}));
    };

    const handleSignInValidate = () => {
        let isValid = true;

        for (let field in signInForm) {
            // @ts-ignore
            if (!signInForm[field]) {
                setSignInFieldsError(prevState => ({
                    ...prevState,
                    [field]: {error: true, text: "Required field is empty"}
                }))

                isValid = false
            }

            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(signInForm.email)) {
                setSignInFieldsError(prevState => ({
                    ...prevState,
                    email: {error: true, text: "Please enter valid email address."}
                }));

                isValid = false;
            }
        }

        return isValid
    };

    const handleSignIn = async () => {
        const isValid = handleSignInValidate();

        if (isValid) {
            logInWithEmailAndPassword(signInForm.email, signInForm.password)
        }
    };

    const signInFormConfig: IAuthForm = {
        page: Routes.signIn,
        inputs: [
            {
                id: "email",
                title: "Email",
                type: "email",
                name: "email",
                placeholder: "Your email",
                variant: InputVariants.primary,
                value: signInForm.email,
                error: signInFieldsError?.email,
                onChange: handleSetEmail
            },
            {
                id: "password",
                title: "Password",
                type: "password",
                name: "password",
                placeholder: "Your password",
                variant: InputVariants.primary,
                value: signInForm.password,
                error: signInFieldsError?.password,
                onChange: handleSetPassword
            }
        ],
        actionButton: {
            title: "Sign In",
            onSubmit: handleSignIn
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate(Routes.home);
    }, [user, loading])

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...signInFormConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default SignInPage;