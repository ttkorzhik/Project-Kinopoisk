import React, {FC} from 'react';

import styles from "./LazyLoader.module.css";

const LazyLoader: FC = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader} />
            <div className={styles.loaderText}>Loading</div>
        </div>
    );
};

export default LazyLoader;