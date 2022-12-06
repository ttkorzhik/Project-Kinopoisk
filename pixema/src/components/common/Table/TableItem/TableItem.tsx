import React, {FC} from 'react';

import {useTheme} from "../../../../context/ThemeContext";

import styles from "./TableItem.module.css";

export interface TableItemProps {
    tableHeader: string
    tableData: string | number
}

const TableItem: FC<TableItemProps> = ({tableHeader= "", tableData= ""}) => {
    const { isLightTheme } = useTheme();
    return (
        <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>{tableHeader}</th>
            <td className={`${styles.tableData} ${isLightTheme && styles.light}`}>{tableData}</td>
        </tr>
    );
};

export default TableItem;