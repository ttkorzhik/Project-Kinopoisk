import React, {FC} from 'react';

import UserAvatar, {UserAvatarProps} from "./UserAvatar/UserAvatar";
import DefaultAvatar from "./DefaultAvatar/DefaultAvatar";

const Avatar: FC<UserAvatarProps> = (props) => {
    return !!props.userName ? <UserAvatar {...props} /> : <DefaultAvatar />;
};

export default Avatar;