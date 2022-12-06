import React, {FC} from 'react';

import TableItem, {TableItemProps} from "./TableItem/TableItem";

import styles from "./Table.module.css";

interface TableProps {
    config: TableItemProps[]
}

const Table: FC<TableProps> = ({config= []}) => {
    return (
        <table className={styles.tableAbout}>
            <tbody>
            {config.map(tableRow =>
                <TableItem key={tableRow.tableHeader} tableHeader={tableRow.tableHeader} tableData={tableRow.tableData} />)
            }
            </tbody>
        </table>
    );
};

export default Table;