import React, {FC, useContext} from 'react';

import {useScreenWidth} from "../../../context/ScreenWidthContext";
import {SliderContext} from "../../../context/SliderContext/SliderContext";

import Film from "../FilmsList/Film/Film";

import styles from "../../../context/SliderContext/SliderContext.module.css";

const RecommendationsList: FC = () => {
    const {isViewForSlider, isSecondaryView, isTabletView, isMobileView} = useScreenWidth();

    const {slideNumber, items} = useContext(SliderContext);

    let changeSlideWidth = isMobileView ? 281 : isTabletView ? 480 : isSecondaryView ? 498 : isViewForSlider ? 614 : 920;

    return (
        <div
            className={styles.slideList}
            style={{transform: `translateX(-${slideNumber && (slideNumber * changeSlideWidth)}px)`}}
        >
            {items?.map((slide, index) => (
                <Film key={index} {...slide} className={styles.film} />))
            }
        </div>
    );
};

export default RecommendationsList;