import React, {FC} from 'react';

import styles from "./Loading.module.css";

const Loading: FC = () => {
    return (
        <div className={styles.loading} />
    );
};

export default Loading;