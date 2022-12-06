import React, {FC, createContext, useState, useMemo, useEffect, useContext} from 'react';

import {WithChildren} from "../types/withChildren";

enum ThemeVariant {
    light = "light",
    dark = "dark"
}

interface ThemeContextValue {
    theme: ThemeVariant | string
    setTheme: (theme: ThemeVariant) => void
    isLightTheme: boolean
    isDarkTheme: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider: FC<WithChildren> = ({ children }) =>  {
    const [theme, setTheme] = useState("");

    const isLightTheme = useMemo(() => theme === ThemeVariant.light, [theme]);
    const isDarkTheme = useMemo(() => theme === ThemeVariant.dark, [theme]);

    const handleSetTheme = (newTheme: ThemeVariant) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme) {
            setTheme(currentTheme)
        } else setTheme(ThemeVariant.dark)
    },[theme])

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: handleSetTheme,
            isLightTheme: isLightTheme,
            isDarkTheme: isDarkTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error("useTheme must be used with ThemeProvider")
    }

    return context
}

export {useTheme, ThemeProvider, ThemeVariant};