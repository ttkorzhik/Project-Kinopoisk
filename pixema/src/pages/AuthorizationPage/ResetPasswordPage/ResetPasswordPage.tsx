import React, {ChangeEventHandler, FC, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {InputError, InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";

import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

interface IResetPasswordForm {
    email: string
}

interface IResetPasswordErrors {
    email: InputError
}

const initialErrorValue = {text: null, error: false};

const initialResetPasswordElementsError: IResetPasswordErrors = {
    email: initialErrorValue
};

const ResetPasswordPage: FC<PageProps> = ({title}) => {
    const navigate = useNavigate();

    const location = useLocation();

    const [resetPasswordForm, setResetPasswordForm] = useState<IResetPasswordForm>({email: ""});
    const [resetPasswordFieldsError, setResetPasswordFieldsError] = useState<IResetPasswordErrors>(initialResetPasswordElementsError);

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email}}): void => {
        setResetPasswordForm(prevState => ({...prevState, email}));
        setResetPasswordFieldsError(prevState => ({...prevState, email: initialErrorValue}));
    };

    const handleFormValidate = () => {
        let isValid = true;

        for (let field in resetPasswordForm) {
            // @ts-ignore
            if (!resetPasswordForm[field]) {
                setResetPasswordFieldsError(prevState => ({
                    ...prevState,
                    [field]: {error: true, text: "Required field is empty"}
                }));

                isValid = false
            }

            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(resetPasswordForm.email)) {
                setResetPasswordFieldsError(prevState => ({
                    ...prevState,
                    email: {error: true, text: "Please enter valid email address."}
                }));

                isValid = false;
            }
        }

        return isValid
    };

    const handleRedirectToReset = () => {
        location.search = `?email=${resetPasswordForm.email}`
        navigate(`${Routes.resetPasswordMessagePage}?email=${resetPasswordForm.email}`)
    };

    const handleSubmit = () => {
        const isValid = handleFormValidate();

        if (isValid) {
            handleRedirectToReset()
        }
    };

    const resetPasswordConfig: IAuthForm = {
        page: Routes.resetPasswordPage,
        inputs: [
            {
                id: "email",
                title: "Email",
                type: "email",
                name: "email",
                placeholder: "example@gmail.com",
                variant: InputVariants.primary,
                value: resetPasswordForm.email,
                error: resetPasswordFieldsError.email,
                onChange: handleSetEmail,
            }
        ],
        actionButton: {
            title: "Reset",
            onSubmit: handleSubmit
        }
    };

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...resetPasswordConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default ResetPasswordPage;