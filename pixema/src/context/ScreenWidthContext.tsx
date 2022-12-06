import React, {FC, createContext, useState, useEffect, useContext} from 'react';

import {WithChildren} from "../types/withChildren";

interface ScreenWidthValue {
    screenWidth: number
    isPrimaryView: boolean
    isViewForSlider: boolean
    isSecondaryView: boolean
    isDesktopView: boolean
    isTabletView: boolean
    isMobileView: boolean
}

const ScreenWidthContext = createContext<ScreenWidthValue | null>(null);

const ScreenWidthProvider: FC<WithChildren> = ({ children }) =>  {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const callback = () => setScreenWidth(window.innerWidth);

    const isPrimaryView = screenWidth >= 1281;
    const isViewForSlider = screenWidth <= 1623;
    const isSecondaryView = screenWidth <= 1024;
    const isDesktopView = screenWidth > 868;
    const isTabletView = screenWidth < 769;
    const isMobileView = screenWidth <= 530;

    useEffect(() => {
        window.addEventListener("resize", callback)
        return () => window.removeEventListener("resize", callback)
    },[])

    return (
        <ScreenWidthContext.Provider value={{
            screenWidth: screenWidth,
            isPrimaryView: isPrimaryView,
            isViewForSlider: isViewForSlider,
            isSecondaryView: isSecondaryView,
            isDesktopView: isDesktopView,
            isTabletView: isTabletView,
            isMobileView: isMobileView
        }}>
            {children}
        </ScreenWidthContext.Provider>
    )
};

function useScreenWidth() {
    const context = useContext(ScreenWidthContext);

    if (context === null) {
        throw new Error("useTheme must be used with ScreenWidthProvide")
    }

    return context
}


export {useScreenWidth, ScreenWidthProvider};