import React, {FC} from 'react';

import styles from "./Footer.module.css";

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>© All Rights Reserved</p>
        </footer>
    );
};

export default Footer;