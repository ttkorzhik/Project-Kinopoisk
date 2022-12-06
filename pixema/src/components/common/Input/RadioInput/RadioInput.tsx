import React, {FC} from 'react';

import {useTheme} from "../../../../context/ThemeContext";
import {InputProps} from "../interfaces";

import styles from "../RadioInput/RadioInput.module.css"

const RadioInput: FC<InputProps> = (props) => {
    const { isLightTheme } = useTheme();
    return (
        <div className={`${isLightTheme ? styles.light : styles.radioWrapper}`}>
            <input {...props} />
            <label htmlFor={props.id}>{props.title}</label>
        </div>
    );
};

export default RadioInput;