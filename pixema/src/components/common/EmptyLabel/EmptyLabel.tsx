import React, {FC} from 'react';

import Label from "../../../assets/EmptyLabel.svg";

import styles from "./EmptyLabel.module.css";

interface EmptyLabelProps {
    text: string
}

const EmptyLabel: FC<EmptyLabelProps> = ({text}) => {
    return (
        <div className={styles.emptyLabel}>
            <img src={Label} className={styles.emptyLabelImage} alt="emptyLabel" />
            <div className={styles.emptyLabelText}>{text}</div>
        </div>
    );
};

export default EmptyLabel;