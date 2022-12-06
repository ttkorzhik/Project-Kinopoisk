import React, {FC} from 'react';

import styles from "../Avatar.module.css";

export interface UserAvatarProps {
    userName: string | null | undefined
    url?: string
    alt?: string
}

const UserAvatar: FC<UserAvatarProps> = ({userName= "", url= "", alt= ""}) => {
    const userAvatar = () => {
        return (userName?.split(/(?=[A-Z])/).map(str => str.charAt(0).toUpperCase()).join(""));
    }

    return (
        <div className={styles.avatar}>
            {!!url ? <img src={url} alt={alt} /> : <span>{userAvatar()}</span>}
        </div>
    );
};

export default UserAvatar;