import React, {FC, MouseEventHandler} from 'react';

import BurgerMenu from "../../../../../assets/Burger.svg";
import CrossMenu from "../../../../../assets/Cancel.svg";

import styles from "./MenuBurger.module.css";

type MenuBurgerVariant = "burger" | "cross";

export interface MenuBurgerProps {
    open?: boolean
    onClick?: MouseEventHandler
    variant?: MenuBurgerVariant
}

const MenuBurger: FC<MenuBurgerProps> = ({open, onClick, variant}) => {
    return (
        <div className={`${open ? styles.burgerBlockLeft : styles.burgerBlock}`} onClick={onClick}>
            <div className={styles.burger}>
                {!open || variant === "burger"
                    ?
                    <img src={BurgerMenu} alt="burger" />
                    :
                    <img src={CrossMenu} alt="cross" />
                }
            </div>
        </div>
    );
};

export default MenuBurger;