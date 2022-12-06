import React, {FC} from 'react';

import DefaultIcon from "../../../../../../../assets/user.svg";

import styles from "../Avatar.module.css";

const DefaultAvatar: FC = () => {
    return (
        <div className={styles.avatar}>
            <img src={DefaultIcon} alt="defaultAvatar" />
        </div>
    );
};

export default DefaultAvatar;