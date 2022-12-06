import React, {FC, ReactNode} from 'react';
import {NavLink, To} from "react-router-dom";

import styles from "../Link/Link.module.css";

export interface IMenuItem {
    id: string
    text: string
    icon: ReactNode
    to: To
}

interface MenuItemProps extends IMenuItem {
    activeLink?: string
    onClick?: () => void
}

const Link: FC<MenuItemProps> = (props) => {
    return (
        <NavLink
            to={props.to}
            onClick={props.onClick}
            className={`${props.activeLink === props.id ? styles.active : ""} ${styles.link}`}
        >
            {props.icon}
            <p className={styles.text}>{props.text}</p>
        </NavLink>
    );
};

export default Link;