import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {Routes} from "../../../../constants/routes";

import LogoImage from "../../../../assets/LogoPixema.png";

import styles from "./Logo.module.css";

const Logo: FC = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(Routes.home)} className={styles.logo}>
            <img src={LogoImage} className={styles.img} alt="imgLogo" />
        </div>
    );
};

export default Logo;