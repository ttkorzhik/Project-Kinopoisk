import React, {FC, MouseEventHandler} from 'react';

import Button, {BtnVariants} from "../../Button/Button";

import styles from "./SettingsActions.module.css";

interface ActionsProps {
    onCancel: MouseEventHandler<HTMLButtonElement>
    onSave: MouseEventHandler<HTMLButtonElement>
}

const SettingsActions: FC<ActionsProps> = ({onCancel, onSave}) => {
    return (
        <div className={styles.actionsWrapper}>
            <Button onClick={onCancel} variant={BtnVariants.secondary} className={styles.buttonCancel}>Cancel</Button>
            <Button onClick={onSave} variant={BtnVariants.primary} className={styles.buttonSave}>Save</Button>
        </div>
    );
};

export default SettingsActions;