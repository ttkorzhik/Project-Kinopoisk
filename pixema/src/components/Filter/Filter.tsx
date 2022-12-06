import React, {ChangeEvent, ChangeEventHandler, forwardRef, useEffect, useState,} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {useTheme} from "../../context/ThemeContext";
import {useScreenWidth} from "../../context/ScreenWidthContext";

import {FilterList, FilterProps, FilterState, initialState, initialStateFilter} from "./interfacesForFilter";
import filterService from "../../services/filterService";
import {handleFilteredFilms} from "../../store/asyncActions/filmsActions";
import {setFilterList, setFilterParamsAction} from "../../store/reducers/filterReducer";
import {setFilteredFilmsAction} from "../../store/reducers/filmsReducer";
import {handleStringForFilter} from "../../utils/handleStringForFilter";

import Title, {TitleVariants} from "../common/Title/Title";
import Button, {BtnVariants} from "../common/Button/Button";
import RadioInput from "../common/Input/RadioInput/RadioInput";
import Input from "../common/Input/Input";
import SelectType from "../common/Select/SelectType/SelectType";
import SelectCountry from "../common/Select/SelectCountry/SelectCountry";
import SelectGenre from "../common/Select/SelectGenre/SelectGenre";

import {InputVariants} from "../common/Input/interfaces";
import {Routes} from "../../constants/routes";

import styles from "../Filter/Filter.module.css";

interface SelectProps {
    label: string
    value: string
}

const Filter = forwardRef<HTMLFormElement, FilterProps>(({visibility, onClick, onChange}, refFilter) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLightTheme, isDarkTheme} = useTheme();
    const { isTabletView } = useScreenWidth();

    const [filterState, setFilterState] = useState<FilterState>(initialState);
    const [filter, setFilter] = useState<FilterList>(initialStateFilter);
    const [selectedCountry, setSelectedCountry] = useState<SelectProps | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<SelectProps[] | null>(null);
    const [selectedType, setSelectedType] = useState<SelectProps | null>(null);

    const handleSetSort = (e: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setFilterState(prevState => ({...prevState, order: e.target.value.toUpperCase()}));
            setFilter(prevState => ({...prevState, order: e.target.value}));
        }
    };

    const handleSetMovieName: ChangeEventHandler<HTMLInputElement> = ({target: {value: keyword}}) => {
        setFilterState(prevState => ({...prevState, keyword}));
        setFilter(prevState => ({...prevState, keyword}));
    };

    const handleSetYearFrom: ChangeEventHandler<HTMLInputElement> = ({target: {value: yearFrom}}) => {
        setFilterState(prevState => ({...prevState, yearFrom}));
        setFilter(prevState => ({...prevState, yearFrom}));
    };

    const handleSetYearTo: ChangeEventHandler<HTMLInputElement> = ({target: {value: yearTo}}) => {
        setFilterState(prevState => ({...prevState, yearTo}));
        setFilter(prevState => ({...prevState, yearTo}));
    };

    const handleSetRatingFrom: ChangeEventHandler<HTMLInputElement> = ({target: {value: ratingFrom}}) => {
        setFilterState(prevState => ({...prevState, ratingFrom}));
        setFilter(prevState => ({...prevState, ratingFrom}));
    };

    const handleSetRatingTo: ChangeEventHandler<HTMLInputElement> = ({target: {value: ratingTo}}) => {
        setFilterState(prevState => ({...prevState, ratingTo}));
        setFilter(prevState => ({...prevState, ratingTo}));
    };

    const handleFilterForType = () => {
        setFilterState(prevState => ({...prevState, type: selectedType?.value}));
        setFilter(prevState => ({...prevState, type: selectedType?.label}));
    };

    const handleSetRemove = () => {
        setFilterState(initialState)
        setSelectedGenre(null)
        setSelectedCountry(null)
        setSelectedType(null)
        navigate(Routes.home)
        dispatch(setFilteredFilmsAction([]))
    };

    const handleFilterForCountry = async () => {
        setFilter(prevState => ({...prevState, countries: selectedCountry?.value}));

        const resp = await filterService.getCountriesId();

        if (resp) {
            const id = resp.find(item => item.country === selectedCountry?.value)?.id
            setFilterState(prevState => ({...prevState, countries: id}));
        }
    };

    const handleFilterForGenre = async () => {
        if (selectedGenre) {
            setFilter(prevState => ({...prevState, genres: selectedGenre[selectedGenre.length - 1]?.value}));

            const response = await filterService.getGenresId();

            if (response) {
                const id = response.find(item => item.genre === selectedGenre[selectedGenre.length - 1]?.value.toLowerCase())?.id;
                setFilterState(prevState => ({...prevState, genres: id}));
            }
        }
    };

    const showResults = () => {
        dispatch(setFilterList(filter))
        dispatch(handleFilteredFilms(1, handleStringForFilter(filterState)))
        dispatch(setFilterParamsAction(handleStringForFilter(filterState)))
        navigate(Routes.filter)
        onChange()
    };

    useEffect(() => {
        handleFilterForCountry()
    }, [selectedCountry])

    useEffect(() => {
        handleFilterForGenre()
    }, [selectedGenre])

    useEffect(() => {
        handleFilterForType()
    }, [selectedType])

    return (
        <form
            ref={refFilter}
            className={visibility && isDarkTheme ? styles.form : visibility && isLightTheme ? styles.light : styles.hidden}
        >
            <div className={styles.top}>
                <Title text="Filters" variant={TitleVariants.big} />
                <Button className={styles.close} onClick={onClick}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`${isLightTheme ? styles.svgLight : styles.svg}`} fillRule="evenodd" clipRule="evenodd" d="M11.6569 10.2429L7.41421 6.00023L11.6569 1.75759C12.0472 1.36727 12.0472 0.733701 11.6569 0.343378C11.2665 -0.0469454 10.633 -0.0469453 10.2426 0.343378L6 4.58602L1.75736 0.343378C1.36704 -0.0469453 0.733469 -0.0469454 0.343146 0.343378C-0.0471771 0.733701 -0.0471771 1.36727 0.343146 1.75759L4.58579 6.00023L0.343146 10.2429C-0.0478838 10.6339 -0.0471771 11.2668 0.343146 11.6571C0.733469 12.0474 1.36633 12.0481 1.75736 11.6571L6 7.41445L10.2426 11.6571C10.6337 12.0481 11.2665 12.0474 11.6569 11.6571C12.0472 11.2668 12.0479 10.6339 11.6569 10.2429Z" fill="#AFB2B6"/>
                    </svg>
                </Button>
            </div>
            <Title text="Sort by" variant={TitleVariants.small} />
            <div className={`${isLightTheme ? styles.radioLight : styles.radio}`}>
                <RadioInput value="Rating" title="Rating" onChange={handleSetSort} id="Rating" type="radio" name="radio" />
                <RadioInput value="Year" title="Year" onChange={handleSetSort} id="Year" type="radio" name="radio" />
            </div>
            <div className={styles.middle}>
                <Input
                    id="Title"
                    title="Full or short movie name"
                    placeholder="Your text"
                    value={filterState.keyword}
                    onChange={handleSetMovieName}
                    variant={InputVariants.primary}
                    className={`${isLightTheme ? styles.inputTitleSort : styles.inputTitleSortDark}`}
                />
                {isTabletView
                    ?
                    <SelectCountry selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} />
                    :
                    <SelectGenre selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} />
                }
                <div className={styles.numbers}>
                    <Input
                        id="YearFrom"
                        title="Years"
                        type="number"
                        placeholder="From"
                        value={filterState.yearFrom}
                        onChange={handleSetYearFrom}
                        variant={InputVariants.forNumbersSort}
                    />
                    <Input
                        id="YearTo"
                        type="number"
                        placeholder="To"
                        value={filterState.yearTo}
                        onChange={handleSetYearTo}
                        variant={InputVariants.forNumbersSortSecond}
                    />
                </div>
                <div className={styles.numbers}>
                    <Input
                        id="RatingFrom"
                        title="Rating"
                        type="number"
                        placeholder="From"
                        value={filterState.ratingFrom}
                        onChange={handleSetRatingFrom}
                        variant={InputVariants.forNumbersSort}
                    />
                    <Input
                        id="RatingTo"
                        type="number"
                        placeholder="To"
                        value={filterState.ratingTo}
                        onChange={handleSetRatingTo}
                        variant={InputVariants.forNumbersSortSecond}
                    />
                </div>
                <SelectType selectedOption={selectedType} setSelectedOption={setSelectedType} />
                {isTabletView
                    ?
                    <SelectGenre selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} />
                    :
                    <SelectCountry selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} />
                }
                <div className={styles.buttons}>
                    <Button variant={BtnVariants.secondary} className={styles.buttonClear} onClick={handleSetRemove}>
                        Clear filter
                    </Button>
                    <Button id={"Show Results"} variant={BtnVariants.primary} className={styles.buttonShow} onClick={showResults}>
                        Show results
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default Filter;