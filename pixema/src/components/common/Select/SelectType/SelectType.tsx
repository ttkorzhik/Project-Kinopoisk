import React, {FC} from 'react';
import Select from 'react-select';

import Title, {TitleVariants} from "../../Title/Title";

import {useTheme} from "../../../../context/ThemeContext";
import {SelectProps} from "../SelectCountry/SelectCountry";

import {customStyles, customStylesLight} from "../SelectCountry/SelectCountryStyles";

const types = [
    {value: 'FILM', label: 'Film'},
    {value: 'TV_SHOW', label: 'TV-Show'},
    {value: 'TV_SERIES', label: 'TV-Series'},
    {value: 'MINI_SERIES', label: 'Mini-Series'},
];

const SelectType: FC<SelectProps> = ({selectedOption, setSelectedOption}) => {
    const { isLightTheme } = useTheme();
    return (
        <div>
            <Title text="Type" variant={TitleVariants.small} />
            <Select
                options={types}
                value={selectedOption}
                placeholder={"Select type"}
                onChange={setSelectedOption}
                defaultValue={selectedOption}
                styles={isLightTheme ? customStylesLight : customStyles}
            />
        </div>
    );
};

export default SelectType;