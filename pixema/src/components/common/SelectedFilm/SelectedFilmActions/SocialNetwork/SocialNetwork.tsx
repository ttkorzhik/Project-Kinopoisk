import React, {FC} from 'react';

import {useTheme} from "../../../../../context/ThemeContext";

import styles from "./SocialNetwork.module.css";

const SocialNetwork: FC = () => {
    const { isLightTheme } = useTheme();
    return (
        <div className={`${styles.wrapper} ${isLightTheme && styles.lightWrapper}`}>
            <div>
                <p className={`${styles.text} ${isLightTheme && styles.lightText}`}>Поделиться:</p>
            </div>
            <div className={styles.buttonShare}>
                <div className="uSocial-Share" data-pid="d3c4f9aca735ce62c6200be409f617af" data-type="share" data-social="vk,telegram,fb"
                     data-options="round-rect,style1,default,absolute,horizontal,size32,eachCounter0,counter0,mobile_position_left,cutUrl"
                />
            </div>
        </div>
    );
};

export default SocialNetwork;