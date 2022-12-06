import React, {FC} from 'react';
import Select, {ActionMeta, SingleValue} from 'react-select';

import {useTheme} from "../../../../context/ThemeContext";

import Title, {TitleVariants} from "../../Title/Title";

import {customStyles, customStylesLight} from "./SelectCountryStyles";

export interface OptionProps {
    value: string
    label: string
}

export interface SelectProps {
    selectedOption: OptionProps | null
    setSelectedOption: (newValue: SingleValue<OptionProps>, actionMeta: ActionMeta<OptionProps>) => void
}

const options = [
    {value: 'США', label: 'США'},
    {value: 'Испания', label: 'Испания'},
    {value: 'Великобритания', label: 'Великобритания'},
    {value: 'Германия', label: 'Германия'},
    {value: 'Франция', label: 'Франция'},
];

const SelectCountry: FC<SelectProps> = ({selectedOption, setSelectedOption}) => {
    const { isLightTheme } = useTheme();
    return (
        <div>
            <Title text="Country" variant={TitleVariants.small} />
            <Select
                options={options}
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder={"Select country"}
                styles={isLightTheme ? customStylesLight : customStyles}
            />
        </div>
    );
};

export default SelectCountry;