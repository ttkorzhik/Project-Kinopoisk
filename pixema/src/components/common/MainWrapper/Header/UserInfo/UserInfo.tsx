import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {useTheme} from "../../../../../context/ThemeContext";
import {useAuth} from "../../../../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {setUserAction} from "../../../../../store/reducers/userReducer";

import Avatar from "./Avatar/Avatar";
import Button, {BtnVariants} from "../../../Button/Button";
import UserMenu from "./UserMenu/UserMenu";

import UserBottom from "../../../../../assets/UserBottom.svg";

import styles from "./UserInfo.module.css";

interface UserInfoProps {
    menu: boolean
    userName?: string | null | undefined
    onClick?: MouseEventHandler
    avatarUrl?: string
    className?: string
}

const UserInfo: FC<UserInfoProps> = (
    {
        avatarUrl= "",
        className= "",
        menu,
        onClick
    }) => {

    const dispatch = useDispatch();

    const { isLightTheme } = useTheme();

    const [name, setName] = useState<string | null>(null);

    const { auth } = useAuth();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            setName(user?.displayName)
            dispatch(setUserAction(auth.currentUser))
        }
    }, [user, loading]);

    return (
        <div className={`${styles.userInfoWrapper} ${className}`}>
            <Link to={!!name ? "" : "/signin"} className={styles.linkNoneDecoration}>
                <div className={styles.userInfo}>
                   <Avatar userName={user?.displayName} url={avatarUrl} />
                    {!!user
                        ?
                        <>
                            <div className={`${styles.userInfoText} ${isLightTheme && styles.light}`} onClick={onClick}>
                                {user?.displayName}
                            </div>
                            <Button variant={BtnVariants.forIcon} onClick={onClick}>
                                <img src={UserBottom} className={`${menu ? styles.rotate : styles.userImg}`} alt="arrow" />
                            </Button>
                        </>
                        :
                        <div className={`${styles.defaultText} ${isLightTheme && styles.light}`}>Sign In</div>
                    }
                </div>
            </Link>
            {menu && <UserMenu />}
        </div>
    );
};

export default UserInfo;