import React, {FC} from 'react';

import {WithChildren} from "../../../types/withChildren";

import Logo from "./Logo/Logo";
import Footer from "./Footer/Footer";

import styles from "./MainAuthWrapper.module.css";

const MainAuthWrapper: FC<WithChildren> = ({children}) => {
    return (
        <div className={styles.mainAuthWrapper}>
            <div className={styles.wrapper}>
                <Logo />
                <main className={styles.container}>
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainAuthWrapper;