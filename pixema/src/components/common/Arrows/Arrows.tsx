import React, {FC, useContext} from 'react';

import {useTheme} from "../../../context/ThemeContext";
import {SliderContext} from "../../../context/SliderContext/SliderContext";

import Button, {BtnVariants} from "../Button/Button";

import LeftDark from "../../../assets/arrowLeftDark.svg";
import LeftLight from "../../../assets/arrowLeftLight.svg";
import RightDark from "../../../assets/arrowRightDark.svg";
import RightLight from "../../../assets/arrowRightLight.svg";

import styles from "../Arrows/Arrows.module.css";

const Arrows: FC = () => {
    const { isLightTheme } = useTheme();

    const { changeSlide } = useContext(SliderContext);

    const handleSlideNext = () => {
        changeSlide(1)
    };

    const handleSlidePrev = () => {
        changeSlide(-1)
    };

    return (
        <div className={styles.arrows}>
            <Button variant={BtnVariants.forIcon} className={styles.arrow} onClick={handleSlidePrev}>
                <img src={isLightTheme ? LeftDark : LeftLight} alt="arrowRight" />
            </Button>
            <Button variant={BtnVariants.forIcon} className={styles.arrow} onClick={handleSlideNext}>
                <img src={isLightTheme ? RightDark : RightLight} alt="arrowRight" />
            </Button>
        </div>
    );
};

export default Arrows;