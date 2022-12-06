import React, {FC} from 'react';

import {useTheme} from "../../../../context/ThemeContext";
import {useScreenWidth} from "../../../../context/ScreenWidthContext";

import UserInfoAdaptive from "./UserInfoAdaptive/UserInfoAdaptive";
import Link, {IMenuItem} from "../../../common/Link/Link";

import styles from "../Menu/Menu.module.css";

interface MenuProps {
    config: IMenuItem[]
    open?: boolean
    activeLink?: string
    onClick?: any
}

const Menu: FC<MenuProps> = ({config, open, activeLink, onClick}) => {
    const { isLightTheme } = useTheme();

    const { isPrimaryView } = useScreenWidth();

    return (
        <div className={`${open ? styles.open : styles.menu} ${isLightTheme && styles.light}`}>
            <div className={styles.top}>
                {!isPrimaryView && <UserInfoAdaptive />}
                {config.map(link => <Link
                                        to={link.to}
                                        id={link.id}
                                        key={link.id}
                                        icon={link.icon}
                                        text={link.text}
                                        onClick={() => onClick(link.id)}
                                        activeLink={activeLink} />
                )}
            </div>
            {!open && <p className={styles.footer}>© All Rights Reserved</p>}
        </div>
    );
};

export default Menu;