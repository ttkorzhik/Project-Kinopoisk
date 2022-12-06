import React, {ChangeEventHandler, FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {InputError, InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";
import {updatePassword} from 'firebase/auth';
import {RootState} from "../../../store";

import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

interface INewPasswordForm {
    password: string
    passwordConfirm: string
}

interface INewPasswordErrors {
    password: InputError
    passwordConfirm: InputError
}

const initialErrorValue = {text: null, error: false};

const initialNewPasswordElementsError: INewPasswordErrors = {
    password: initialErrorValue,
    passwordConfirm: initialErrorValue
};

const NewPasswordPage: FC<PageProps> = ({title}) => {
    const navigate = useNavigate();

    const [newPasswordForm, setNewPasswordForm] = useState<INewPasswordForm>({password: "", passwordConfirm: ""});
    const [newPasswordFieldsError, setNewPasswordFieldsError] = useState<INewPasswordErrors>(initialNewPasswordElementsError);

    const { user } = useSelector((state: RootState) => state.user);

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password}}): void => {
        setNewPasswordForm(prevState => ({...prevState, password}));
        setNewPasswordFieldsError(prevState => ({...prevState, password: initialErrorValue}));
    };

    const handleSetPasswordConfirm: ChangeEventHandler<HTMLInputElement> = ({target: {value: passwordConfirm}}): void => {
        setNewPasswordForm(prevState => ({...prevState, passwordConfirm}));
        setNewPasswordFieldsError(prevState => ({...prevState, passwordConfirm: initialErrorValue}));
    };

    const newPassword = newPasswordForm.password;

    const handleUpdatePassword = async () => {
        if (user) {
            updatePassword(user, newPassword)
                .then(() => navigate(Routes.successNewPasswordPage))
                .catch((error) => console.log(error))
        } else navigate(Routes.signIn)
    };

    const handleFormValidate = () => {
        let isValid = true;

        for (let field in newPasswordForm) {
            // @ts-ignore
            if (!newPasswordForm[field]) {
                setNewPasswordFieldsError(prevState => ({
                    ...prevState,
                    [field]: {error: true, text: "Required field is empty"}
                }));

                isValid = false
            }
        }

        if (newPasswordForm.password !== newPasswordForm.passwordConfirm) {
            setNewPasswordFieldsError(prevState => ({
                ...prevState,
                passwordConfirm: {error: true, text: "Passwords don't match"}
            }));

            isValid = false
        }

        return isValid
    };


    const handleSubmit = () => {
        const isValid = handleFormValidate();

        if (isValid) {
            handleUpdatePassword()
        }
    };

    const newPasswordConfig: IAuthForm = {
        page: Routes.newPasswordPage,
        inputs: [
            {
                id: "password",
                title: "Password",
                type: "password",
                name: "password",
                placeholder: "Your password",
                variant: InputVariants.primary,
                value: newPasswordForm.password,
                error: newPasswordFieldsError.password,
                onChange: handleSetPassword,
                disabled: false
            },
            {
                id: "confirmPassword",
                title: "Confirm password",
                type: "password",
                name: "confirmPassword",
                placeholder: "Confirm your password",
                variant: InputVariants.primary,
                onChange: handleSetPasswordConfirm,
                value: newPasswordForm.passwordConfirm,
                error: newPasswordFieldsError.passwordConfirm,
                disabled: false
            }
        ],
        actionButton: {
            title: "Set Password",
            onSubmit: handleSubmit
        },
    };

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...newPasswordConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default NewPasswordPage;