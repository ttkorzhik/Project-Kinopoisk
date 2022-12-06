import React, {FC, MouseEventHandler} from 'react';

import FilterItem from "./FilterItem/FilterItem";

import styles from "./FilterList.module.css"

interface FilterListProps {
    list: string[]
    onClick?: MouseEventHandler
}

const FilterList: FC<FilterListProps> = ({list, onClick}) => {
    return (
        <div className={styles.wrapper}>
            {list.map((item, index) => <FilterItem key={index} selectedFilter={item} onClick={onClick} />)}
        </div>
    );
};

export default FilterList;