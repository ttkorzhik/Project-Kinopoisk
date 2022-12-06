import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {InputError, InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";
import {useAuth} from "../../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";

import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

interface ISignUpForm {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

interface ISignUpErrors {
    name: InputError
    email: InputError
    password: InputError
    passwordConfirm: InputError
}

const initialErrorValue = {text: null, error: false};

const initialSignUpElementsError: ISignUpErrors = {
    name: initialErrorValue,
    email: initialErrorValue,
    password: initialErrorValue,
    passwordConfirm: initialErrorValue,
};

const SignUpPage: FC<PageProps> = ({title}) => {

    const navigate = useNavigate();

    const [signUpForm, setSignUpForm] = useState<ISignUpForm>({name: "", email: "", password: "", passwordConfirm: ""});
    const [signUpFieldsError, setSignUpFieldsError] = useState<ISignUpErrors>(initialSignUpElementsError);

    const {auth, registerWithEmailAndPassword} = useAuth();
    const [user, loading] = useAuthState(auth);

    const handleSetName: ChangeEventHandler<HTMLInputElement> = ({target: {value: name}}): void => {
        setSignUpForm(prevState => ({...prevState, name}));
        setSignUpFieldsError(prevState => ({...prevState, name: initialErrorValue}));
    };

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email}}): void => {
        setSignUpForm(prevState => ({...prevState, email}));
        setSignUpFieldsError(prevState => ({...prevState, email: initialErrorValue}));
    };

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password}}): void => {
        setSignUpForm(prevState => ({...prevState, password}));
        setSignUpFieldsError(prevState => ({...prevState, password: initialErrorValue}));
    };

    const handleSetPasswordConfirm: ChangeEventHandler<HTMLInputElement> = ({target: {value: passwordConfirm}}): void => {
        setSignUpForm(prevState => ({...prevState, passwordConfirm}));
        setSignUpFieldsError(prevState => ({...prevState, passwordConfirm: initialErrorValue}));
    };

    const handleFormValidate = () => {
        let isValid = true;

        for (let field in signUpForm) {
            // @ts-ignore
            if (!signUpForm[field]) {
                setSignUpFieldsError(prevState => ({
                    ...prevState,
                    [field]: {error: true, text: "Required field is empty"}
                }));

                isValid = false
            }
        }

        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(signUpForm.email)) {
            setSignUpFieldsError(prevState => ({
                ...prevState,
                email: {error: true, text: "Please enter valid email address."}
            }));

            isValid = false;
        }

        if (signUpForm.password !== signUpForm.passwordConfirm) {
            setSignUpFieldsError(prevState => ({
                ...prevState,
                passwordConfirm: {error: true, text: "Passwords don't match"}
            }));

            isValid = false
        }

        return isValid
    };

    const register = () => {
        registerWithEmailAndPassword(signUpForm.name, signUpForm.email, signUpForm.password);
    };

    const handleSubmit = () => {
        const isValid = handleFormValidate();

        if (isValid) {
            register()
        }
    };

    const signUpFormConfig: IAuthForm = {
        page: Routes.signUp,
        inputs: [
            {
                id: "name",
                title: "Name",
                type: "name",
                name: "name",
                placeholder: "Your name",
                variant: InputVariants.primary,
                value: signUpForm.name,
                error: signUpFieldsError.name,
                onChange: handleSetName
            },
            {
                id: "email",
                title: "Email",
                type: "email",
                name: "email",
                placeholder: "Your email",
                variant: InputVariants.primary,
                value: signUpForm.email,
                error: signUpFieldsError.email,
                onChange: handleSetEmail
            },
            {
                id: "password",
                title: "Password",
                type: "password",
                name: "password",
                placeholder: "Your password",
                variant: InputVariants.primary,
                value: signUpForm.password,
                error: signUpFieldsError.password,
                onChange: handleSetPassword
            },
            {
                id: "confirmPassword",
                title: "Confirm password",
                type: "password",
                name: "confirmPassword",
                placeholder: "Confirm your password",
                value: signUpForm.passwordConfirm,
                variant: InputVariants.primary,
                error: signUpFieldsError.passwordConfirm,
                onChange: handleSetPasswordConfirm,
            }
        ],
        actionButton: {
            title: "Sign Up",
            onSubmit: handleSubmit
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate(Routes.home);
    }, [user, loading])

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...signUpFormConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default SignUpPage;