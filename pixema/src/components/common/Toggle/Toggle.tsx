import React, {FC} from 'react';

import styles from "./Toggle.module.css";

interface ToggleProps {
    value: boolean
    onChange: () => void
}

const Toggle: FC<ToggleProps> = ({value, onChange}) => {
    return (
        <label className={styles.switch} htmlFor="toggle">
            <input
                id="toggle"
                type="checkbox"
                onClick={onChange}
                checked={value}
                className={styles.input}
                readOnly
            />
            <span className={styles.slider} />
        </label>
    );
};

export default Toggle;