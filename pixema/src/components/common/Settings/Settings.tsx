import React, {FC, ChangeEventHandler, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {updatePassword, updateEmail, updateProfile, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {ThemeVariant, useTheme} from "../../../context/ThemeContext";

import Input from "../Input/Input";
import Toggle from "../Toggle/Toggle";
import SettingsActions from "./SettingsActions/SettingsActions";

import {InputError, InputVariants} from "../Input/interfaces";
import {Routes} from "../../../constants/routes";

import styles from "./Settings.module.css";

interface SettingsState {
    name: string
    email: string
    password: string
    newPassword: string
    confirmPassword: string
}

interface ISettingsErrors {
    name: InputError
    email: InputError
    password: InputError
    newPassword: InputError
    confirmPassword: InputError
}

const initialErrorValue = {text: null, error: false};

const initialSettingsElementsError: ISettingsErrors = {
    name: initialErrorValue,
    email: initialErrorValue,
    password: initialErrorValue,
    newPassword: initialErrorValue,
    confirmPassword: initialErrorValue,
};

const Settings: FC = () => {
    const navigate = useNavigate();

    const {theme, setTheme, isLightTheme} = useTheme();

    const { auth } = useAuth();
    const [user] = useAuthState(auth);

    const settingsInitialState = {
        name: user?.displayName ? user.displayName : "",
        email: user?.email ? user.email : "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    };

    const [settings, setSettings] = useState<SettingsState>(settingsInitialState);
    const [settingsFieldsError, setSettingsFieldsError] = useState<ISettingsErrors>(initialSettingsElementsError);


    const handleSetName: ChangeEventHandler<HTMLInputElement> = ({target: {value: name}}) => {
        setSettings(prevState => ({...prevState, name}));
        setSettingsFieldsError(prevState => ({...prevState, name: initialErrorValue}));
    };

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email}}) => {
        setSettings(prevState => ({...prevState, email}));
        setSettingsFieldsError(prevState => ({...prevState, email: initialErrorValue}));
    };

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password}}) => {
        setSettings(prevState => ({...prevState, password}));
        setSettingsFieldsError(prevState => ({...prevState, password: initialErrorValue}));
    };

    const handleSetNewPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: newPassword}}) => {
        setSettings(prevState => ({...prevState, newPassword}));
        setSettingsFieldsError(prevState => ({...prevState, newPassword: initialErrorValue}));
    };

    const handleSetConfirmPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: confirmPassword}}) => {
        setSettings(prevState => ({...prevState, confirmPassword}));
        setSettingsFieldsError(prevState => ({...prevState, confirmPassword: initialErrorValue}));
    };

    const handleSettingsValidate = () => {
        let isValid = true;

        for (let field in settings) {
            //@ts-ignore
            if (!settings[field]) {
                setSettingsFieldsError(prevState =>
                    ({...prevState, [field]: {error: true, text: "Required field is empty"}}))

                isValid = false
            }
        }

        return isValid
    };

    const saveProfile = async () => {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, settings.password);

        try {
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updateProfile(auth.currentUser, {displayName: settings.name })
            await updateEmail(auth.currentUser, settings.email);
            await updatePassword(auth.currentUser,settings.newPassword)
            navigate(Routes.home)
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = () => {
        saveProfile()
    };

    const handleSettingsSave = async () => {
        const isValid = handleSettingsValidate();

        if (isValid) {
            handleSubmit()
        }
    };

    const handleSettingsCancel = () => {
        setSettings(settingsInitialState);
        setSettingsFieldsError(initialSettingsElementsError);
    };

    const handleThemeToggle = () => {
        if (theme === ThemeVariant.light) {
            setTheme(ThemeVariant.dark)
        }
        if (theme === ThemeVariant.dark) {
            setTheme(ThemeVariant.light)
        }
    };

    return (
        <form className={styles.settingsWrapper}>
            <div className={styles.settingsProfile}>
                <h2 className={`${styles.profileTitle} ${isLightTheme && styles.lightTitle}`}>Profile</h2>
                <div className={`${styles.profileInputs} ${isLightTheme && styles.light}`}>
                    <Input
                        id="name"
                        title="Name"
                        type="name"
                        name="name"
                        placeholder={settingsInitialState.name}
                        variant={InputVariants.primary}
                        className={styles.nameInput}
                        value={settings.name}
                        error={settingsFieldsError?.name}
                        onChange={handleSetName}
                        required
                    />
                    <Input
                        id="email"
                        title="Email"
                        type="email"
                        name="name"
                        placeholder={user?.email ? user.email : "example@gmail.com"}
                        variant={InputVariants.primary}
                        className={styles.emailInput}
                        value={settings.email}
                        error={settingsFieldsError?.email}
                        onChange={handleSetEmail}
                        required
                    />
                </div>
            </div>
            <div className={styles.settingsPassword}>
                <h2 className={`${styles.passwordTitle} ${isLightTheme && styles.lightTitle}`}>Password</h2>
                <div className={`${styles.passwordInputs} ${isLightTheme && styles.light}`}>
                    <div className={styles.passwordInputsLeft}>
                        <Input
                            id="password"
                            title="Password"
                            type="password"
                            name="password"
                            placeholder="Your password"
                            variant={InputVariants.primary}
                            className={styles.passwordInput}
                            value={settings.password}
                            error={settingsFieldsError?.password}
                            onChange={handleSetPassword}
                            required
                        />
                    </div>
                    <div className={styles.passwordInputsRight}>
                        <Input
                            id="newPassword"
                            title="New password"
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            variant={InputVariants.primary}
                            className={styles.newPasswordInput}
                            value={settings.newPassword}
                            error={settingsFieldsError?.newPassword}
                            onChange={handleSetNewPassword}
                            required
                        />
                        <Input
                            id="confirmPassword"
                            title="Confirm password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            variant={InputVariants.primary}
                            className={styles.confirmPasswordInput}
                            value={settings.confirmPassword}
                            error={settingsFieldsError?.confirmPassword}
                            onChange={handleSetConfirmPassword}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className={styles.colorMode}>
                <h2 className={`${styles.colorModeTitle} ${isLightTheme && styles.lightTitle}`}>Color mode</h2>
                <div className={`${styles.colorModeContent} ${isLightTheme && styles.light}`}>
                    <div className={styles.colorModeDescription}>
                        Dark
                        <div className={`${styles.text} ${isLightTheme && styles.lightText}`}>Use dark theme</div>
                    </div>
                    <div className={styles.colorModeToggle}>
                        <Toggle value={theme === ThemeVariant.dark} onChange={handleThemeToggle} />
                    </div>
                </div>
            </div>
            <SettingsActions onCancel={handleSettingsCancel} onSave={handleSettingsSave} />
        </form>
    );
};

export default Settings;