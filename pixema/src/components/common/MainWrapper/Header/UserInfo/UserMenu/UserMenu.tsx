import React, {FC} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import {useTheme} from "../../../../../../context/ThemeContext";
import {useAuth} from "../../../../../../context/AuthContext";
import {signOut} from "firebase/auth";

import Button, {BtnVariants} from "../../../../Button/Button";

import {Routes} from "../../../../../../constants/routes";

import styles from "./UserMenu.module.css"

const UserMenu: FC = () => {
    const navigate = useNavigate();

    const { isLightTheme} = useTheme();

    const { auth } = useAuth();

    const signOutUser = async () => {
        try {
            await signOut(auth);
            navigate(Routes.signIn)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${isLightTheme && styles.light} ${styles.wrapper}`}>
                <NavLink to={Routes.settings} className={`${isLightTheme ? styles.lightItemFirst : styles.itemFirst}`}>
                    Edit profile
                </NavLink>
            <Button variant={BtnVariants.forIcon} onClick={signOutUser}>
                <p className={`${isLightTheme ? styles.lightItem : styles.item}`}>Log Out</p>
            </Button>
        </div>
    );
};

export default UserMenu;