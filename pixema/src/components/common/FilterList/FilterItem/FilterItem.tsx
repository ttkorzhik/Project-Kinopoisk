import React, {FC, MouseEventHandler} from 'react';

import {useTheme} from "../../../../context/ThemeContext";

import Button, {BtnVariants} from "../../Button/Button";

import styles from "./FilterItem.module.css"

interface FilterItemProps {
    selectedFilter?: string
    onClick?: MouseEventHandler
}

const FilterItem: FC<FilterItemProps> = ({selectedFilter, onClick}) => {
    const { isLightTheme } = useTheme();

    return (
        <div className={`${isLightTheme ? styles.light : styles.filterItem}`} onClick={onClick} id={selectedFilter}>
            {selectedFilter}
            <Button variant={BtnVariants.forIcon}>
                <svg className={styles.svg}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`${isLightTheme ? styles.lightSvg : styles.svg}`} d="M13.4301 11.8426L17.3646 7.62478L16.2332 6.49341L12.2797 10.7315L8.15085 6.74365L7 7.8552L11.1888 11.901L7.25432 16.1188L8.38569 17.2502L12.3392 13.012L16.468 16.9999L17.6188 15.8883L13.4301 11.8426Z" fill="#AFB2B6"/>
                </svg>
            </Button>
        </div>
    );
};

export default FilterItem;
