import React, {FC} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {InputVariants} from "../../../components/common/Input/interfaces";
import {PageProps, Routes} from "../../../constants/routes";
import {useAuth} from "../../../context/AuthContext";

import MainAuthWrapper from "../../../components/common/MainAuthWrapper/MainAuthWrapper";
import AuthWrapper from "../../../components/common/AuthWrapper/AuthWrapper";
import AuthForm, {IAuthForm} from "../../../components/common/AuthForm/AuthForm";

const ResetPasswordMessagePage: FC<PageProps> = ({title}) => {
    const navigate = useNavigate();

    const { search } = useLocation();

    const { sendPasswordReset } = useAuth();

    const query = search.split("?email=")[1];

    const handleRedirectToReset = () => {
        sendPasswordReset(query)
        navigate(Routes.newPasswordPage)
    };

    const resetPasswordMessageConfig: IAuthForm = {
        page: Routes.resetPasswordPage,
        topText: `You will receive an email ${query} with a link to reset your password!`,
        inputs: [
            {
                id: "email",
                title: "Email",
                type: "email",
                name: "email",
                placeholder: "example@gmail.com",
                variant: InputVariants.primary,
                value: query,
                disabled: true
            }
        ],
        actionButton: {
            title: "Reset",
            onSubmit: handleRedirectToReset
        }
    };

    return (
        <MainAuthWrapper>
            <AuthWrapper title={title}>
                <AuthForm {...resetPasswordMessageConfig} />
            </AuthWrapper>
        </MainAuthWrapper>
    );
};

export default ResetPasswordMessagePage;