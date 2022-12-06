export const customStyles = {
    option: (provided: {}, state: any) => ({
        ...provided,
        borderBottom: '1px solid #242426',
        color: state.isFocused ? '#7B61FF' : '#FFFFFF',
        padding: 16,
        background: state.isFocused ? "#323537" : "#323537",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#323537"
        },
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
    }),
    menu: () => ({
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
        background: "#323537",
        width: "100%",
    }),
    menuList: () => ({
        padding: 0,
        margin: 0
    }),
    control: (provided: any, state: any) => ({
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
    indicatorSeparator: () => ({
        display: "none"
    }),
    indicatorsContainer: () => ({
        paddingRight: 8,
    }),

    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color = "#FFFFFF"
        return {...provided, opacity, transition, color};
    }
};

export const customStylesLight = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px solid #AFB2B6',
        color: state.isFocused ? '#7B61FF' : '#323537',
        padding: 16,
        background: state.isFocused ? "#FFFFFF" : "#FFFFFF",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#fafafa"
        },
        fontFamily: 'Exo 2',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,

    }),
    menu: () => ({
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
        background: "#FFFFFF",
        width: "100%",
    }),
    menuList: () => ({
        padding: 0,
        margin: 0
    }),
    control: (provided: any, state: any) => ({
        ...provided,
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
    indicatorSeparator: () => ({
        display: "none"
    }),
    indicatorsContainer: () => ({
        paddingRight: 8,
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color = "#323537"
        return {...provided, opacity, transition, color};
    }
};