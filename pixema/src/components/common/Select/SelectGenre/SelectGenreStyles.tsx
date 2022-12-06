import {StylesConfig} from "react-select";
import {OptionProps} from "./SelectGenre";

export const GenreStyles: StylesConfig<OptionProps> = {
    control: (provided: any, state: any) => ({
        ...provided,
        marginTop: 8,
        width: 438,
        background: "#323537",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        display: "flex",
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        color: "#FFFFFF",
        cursor: "pointer",
        boxShadow: "none",
        outline: "none",
        borderWidth: "2px",
        ':active': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        ':hover': {
            borderColor: "#323537",
        },
        ':focus': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        borderColor: state.isFocused || state.isSelected ? 'rgba(123, 97, 255, 1)' : '#323537',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px solid #242426',
        color: state.isFocused ? '#7B61FF' : '#FFFFFF',
        height: 55,
        paddingRight: 16,
        paddingLeft: 20,
        display: "flex",
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "space-between",
        background: state.isFocused ? "#323537" : "#323537",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#323537"
        },
        ':after': state.isFocused && {
            color: "#7B61FF",
            content: "url(\"data:image/svg+xml;charset=UTF-8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' version='1.1'><path d='M7 12L10.5 15.5L18 8' stroke='rgba(123, 97, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\");",
            display: "flex",
            justifyContent: "space-between",
        },
        marginBottom: 0
    }),
    menu: () => ({
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
        background: "#323537",
        cursor: "pointer",
        width: "100%",
    }),
    menuList: () => ({
        padding: 0,
        margin: 0
    }),
    multiValue: (base: any, state: any) => {
        return {
            ...base,
            backgroundColor: '#242426',
            borderRadius: 6,
            fontFamily: 'Exo 2',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 16,
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 5,
            paddingBottom: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
    },
    multiValueLabel: (base: any) => {
        return {
            ...base,
            color: 'white',
            fontFamily: 'Exo 2',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 16,
        }
    },
    multiValueRemove: (base: any) => {
        return {...base, display: 'flex', width: 24, height: 24, paddingTop: 3, ':hover': {
                backgroundColor: "#242426"
            },
        };
    },
    indicatorSeparator: () => ({
        display: "none"
    }),
    indicatorsContainer: () => ({
        display: "none"
    }),
    input: (styles) => ({...styles, color: 'white' }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color = "#FFFFFF"
        const cursor = "pointer"
        return {...provided, opacity, transition, color, cursor};
    }
};

export const GenreStylesTablet: StylesConfig<OptionProps> = {
    ...GenreStyles, control: (provided: any, state: any) => ({
        ...provided,
        marginTop: 8,
        width: "100%",
        background: "#323537",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        display: "flex",
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        color: "#FFFFFF",
        cursor: "pointer",
        boxShadow: "none",
        outline: "none",
        borderWidth: "2px",
        ':active': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        ':hover': {
            borderColor: "#323537",
        },
        ':focus': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        borderColor: state.isFocused || state.isSelected ? 'rgba(123, 97, 255, 1)' : '#323537',
    }),
};

export const GenreStylesLight: StylesConfig<OptionProps> = {
    control: (provided: any, state: any) => ({
        ...provided,
        marginTop: 8,
        width: "100%",
        background: "#FFFFFF",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        display: "flex",
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        color: "#323537",
        cursor: "pointer",
        boxShadow: "none",
        outline: "none",
        borderWidth: "2px",
        ':active': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        ':hover': {
            borderColor: "#FFFFFF",
        },
        ':focus': {
            borderColor: "rgba(123, 97, 255, 1)",
        },
        borderColor: state.isFocused || state.isSelected ? 'rgba(123, 97, 255, 1)' : '#FFFFFF',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px solid #AFB2B6',
        color: state.isFocused ? '#7B61FF' : '#323537',
        height: 55,
        paddingRight: 16,
        paddingLeft: 20,
        display: "flex",
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "space-between",
        background: state.isFocused ? "#FFFFFF" : "#FFFFFF",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#fafafa"
        },
        ':after': state.isFocused && {
            color: "#7B61FF",
            content: "url(\"data:image/svg+xml;charset=UTF-8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' version='1.1'><path d='M7 12L10.5 15.5L18 8' stroke='rgba(123, 97, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\");",
            display: "flex",
            justifyContent: "space-between",
        },
        marginBottom: 0
    }),
    menu: () => ({
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
        background: "#FFFFFF",
        cursor: "pointer",
        width: "100%",
        transition: "0.3"
    }),
    menuList:  () => ({
        padding: 0,
        margin: 0
    }),
    multiValue: (base: any) => {
        return { ...base,
            backgroundColor: '#80858B' ,
            borderRadius: 6,
            fontFamily: 'Exo 2',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 16,
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 3,
            paddingBottom: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
    },
    multiValueLabel: (base: any) => {
        return {
            ...base,
            color: 'white',
            fontFamily: 'Exo 2',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 16,
        }
    },
    multiValueRemove: (base: any) => {
        return {...base, display: 'flex', width: 24, height: 24, paddingTop: 3, color: "#FFFFFF", ':hover': {
                backgroundColor: "#80858B"},
        };
    },
    indicatorSeparator: () => ({
        display: "none"
    }),
    indicatorsContainer: () => ({
        display: "none"
    }),
    input: (styles) => ({...styles, color: 'white' }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color = "#FFFFFF"
        const cursor = "pointer"
        return {...provided, opacity, transition, color, cursor};
    }
};