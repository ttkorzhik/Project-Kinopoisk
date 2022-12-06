import React, {ChangeEventHandler, FC, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {InputError, InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";
import {useAuth} from "../../../context/AuthContext";

import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

interface ISuccessNewPasswordForm {
    email: string
    password: string
}

interface ISuccessNewPasswordErrors {
    email: InputError
    password: InputError
}

const initialErrorValue = {text: null, error: false};

const initialSuccessNewPasswordElementsError: ISuccessNewPasswordErrors = {
    email: initialErrorValue,
    password: initialErrorValue,
};

const SuccessNewPasswordPage: FC<PageProps> = ({title}) => {
    const navigate = useNavigate();

    const [successNewPasswordForm, setSuccessNewPasswordForm] = useState<ISuccessNewPasswordForm>({email: "", password: ""});
    const [successNewPasswordFieldsError, setSuccessNewPasswordFieldsError] = useState<ISuccessNewPasswordErrors>(initialSuccessNewPasswordElementsError);

    const { logInWithEmailAndPassword } = useAuth();

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email}}): void => {
        setSuccessNewPasswordForm(prevState => ({...prevState, email}));
        setSuccessNewPasswordFieldsError(prevState => ({...prevState, email: initialErrorValue}));
    };

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password}}): void => {
        setSuccessNewPasswordForm(prevState => ({...prevState, password}));
        setSuccessNewPasswordFieldsError(prevState => ({...prevState, password: initialErrorValue}));
    };

    const handleFormValidate = () => {
        let isValid = true;

        for (let field in successNewPasswordForm) {
            // @ts-ignore
            if (!successNewPasswordForm[field]) {
                setSuccessNewPasswordFieldsError(prevState => ({
                    ...prevState,
                    [field]: {error: true, text: "Required field is empty"}
                }));

                isValid = false
            }

            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(successNewPasswordForm.email)) {
                setSuccessNewPasswordFieldsError(prevState => ({
                    ...prevState,
                    email: {error: true, text: "Please enter valid email address."}
                }));

                isValid = false;
            }
        }

        return isValid
    };

    const handleSubmit = () => {
        const isValid = handleFormValidate();

        if (isValid) {
            logInWithEmailAndPassword(successNewPasswordForm.email, successNewPasswordForm.password)
            navigate(Routes.home)
        }
    };

    const successNewPasswordFormConfig: IAuthForm = {
        page: Routes.successNewPasswordPage,
        topText: `Your password has been changed !`,
        inputs: [
            {
                id: "email",
                title: "Email",
                type: "email",
                name: "email",
                placeholder: "Your email",
                variant: InputVariants.primary,
                value: successNewPasswordForm.email,
                error: successNewPasswordFieldsError.email,
                onChange: handleSetEmail,
                disabled: false
            },
            {
                id: "password",
                title: "Password",
                type: "password",
                name: "password",
                placeholder: "Your password",
                variant: InputVariants.primary,
                value: successNewPasswordForm.password,
                error: successNewPasswordFieldsError.password,
                onChange: handleSetPassword,
                disabled: false,
            }
        ],
        actionButton: {
            title: "Sign In",
            onSubmit: handleSubmit
        },
    };

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...successNewPasswordFormConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default SuccessNewPasswordPage;
