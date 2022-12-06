import React, {FC} from 'react';
import {components, PropsValue} from 'react-select';
import Select, {DropdownIndicatorProps} from 'react-select';

import Title, {TitleVariants} from "../../Title/Title";

import {useTheme} from "../../../../context/ThemeContext";
import {useScreenWidth} from "../../../../context/ScreenWidthContext";

import {GenreStyles, GenreStylesLight, GenreStylesTablet} from "./SelectGenreStyles";

export interface OptionProps {
    readonly value: string;
    readonly label: string;
}

interface MultiSelectProps {
    selectedOption: PropsValue<OptionProps> | undefined
    setSelectedOption: any
}

const options = [
    {value: 'Триллер', label: 'Триллер'},
    {value: 'Фантастика', label: 'Фантастика'},
    {value: 'Боевик', label: 'Боевик'},
    {value: 'Комедия', label: 'Комедия'},
    {value: 'Ужасы', label: 'Ужасы'},
    {value: 'Мультфильм', label: 'Мультфильм'},
    {value: 'Аниме', label: 'Аниме'},
    {value: 'Детектив', label: 'Детектив'},
    {value: 'Драма', label: 'Драма'},
];

const DropdownIndicator = (props: DropdownIndicatorProps<OptionProps, true>) => {
    return (
        <components.DropdownIndicator {...props}>
        </components.DropdownIndicator>
    );
};

const SelectGenre: FC<MultiSelectProps> = ({selectedOption, setSelectedOption}) => {
    const { isLightTheme } = useTheme();
    const { isTabletView } = useScreenWidth();

    return (
        <div>
            <Title text="Genre" variant={TitleVariants.small} />
            <Select
                isMulti
                options={options}
                value={selectedOption}
                closeMenuOnSelect={false}
                onChange={setSelectedOption}
                placeholder={"Select Genre"}
                defaultValue={selectedOption}
                components={{DropdownIndicator}}
                styles={isLightTheme ? GenreStylesLight : isTabletView ? GenreStylesTablet : GenreStyles}
            />
        </div>
    );
};

export default SelectGenre;