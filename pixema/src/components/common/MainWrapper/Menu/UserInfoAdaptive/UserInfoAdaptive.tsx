import React, {FC, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import {useTheme} from "../../../../../context/ThemeContext";
import {useAuth} from "../../../../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import {Routes} from "../../../../../constants/routes";

import Avatar from "../../Header/UserInfo/Avatar/Avatar";
import Button, {BtnVariants} from "../../../Button/Button";

import styles from "../UserInfoAdaptive/UserInfoAdaptive.module.css";

const UserInfoAdaptive: FC = () => {
    const navigate = useNavigate();

    const { isLightTheme } = useTheme();

    const [name, setName] = useState<string | null>(null);

    const { auth } = useAuth();
    const [user, loading] = useAuthState(auth);

    const signOutUser = async () => {
        try {
            await signOut(auth);
            navigate(Routes.signIn)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return;
        if (user) {
            setName(user?.displayName)
        }
    }, [user, loading]);

    return (
        <div className={styles.wrapper}>
            <Avatar userName={name} />
            <div className={styles.menu}>
                {!user
                    ?
                    <NavLink to={Routes.signIn} className={`${styles.link} ${isLightTheme && styles.light}`}>
                        Sign In
                    </NavLink>
                    :
                    <Button
                        onClick={signOutUser}
                        variant={BtnVariants.forIcon}
                        className={`${styles.link} ${isLightTheme && styles.light}`}
                    >
                        Log Out
                    </Button>
                }
            </div>
        </div>
    );
};

export default UserInfoAdaptive;