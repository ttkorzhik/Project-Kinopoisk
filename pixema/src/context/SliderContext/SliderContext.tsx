import React, {FC, useEffect, useState, createContext} from "react";

import {useTheme} from "../ThemeContext";
import {IMovie} from "../../components/common/FilmsList/Film/interfaces";
import filterService from "../../services/filterService";
import RecommendationsService from "../../services/recommendationsService";

import Title, {TitleVariants} from "../../components/common/Title/Title";
import Arrows from "../../components/common/Arrows/Arrows";
import RecommendationsList from "../../components/common/RecommendationsList/RecommendationsList";

import styles from "../SliderContext/SliderContext.module.css"

interface SliderContextValue {
    items: IMovie[] | null
    slidesCount: number | null
    slideNumber: number | null
    changeSlide: (number: number) => void
}

interface SliderProps {
    str?: string
    limit?: number
    autoPlay?: boolean
    autoPlayTime?: number
}

export const SliderContext = createContext<SliderContextValue>({
    items: [],
    slidesCount: null,
    slideNumber: null,
    changeSlide: () => {}
});

const SliderContextProvider: FC<SliderProps> = (
    {
        str= "",
        limit= 4,
        autoPlay = false,
        autoPlayTime= 5000
    }) => {

    const { isLightTheme } = useTheme();

    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const pageNumbers = items.length / limit;

    const changeSlide = (direction = 1) => {
        let slideNumber = 1;

        if (slide + direction < 0) {
            slideNumber = pageNumbers - 1;
        } else {
            slideNumber = (slide + direction) % pageNumbers;
        }

        setSlide(slideNumber);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchPosition === null) {
            return
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    };

    useEffect(() => {
        const loadData = async () => {
            const response = await filterService.getGenresId();

            if (response) {
                const id = response.find(item => item?.genre === str)?.id;
                const films = await RecommendationsService.getRecommendations(id);

                setItems(films)
            }
        };

        loadData();
    }, [])

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide])

    return (
        <div className={styles.slider} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <SliderContext.Provider
                value={{
                    items,
                    slidesCount: items.length,
                    slideNumber: slide,
                    changeSlide
                }}
            >
                <div className={styles.recommendHeader}>
                    <Title className={isLightTheme ? styles.light : ""} variant={TitleVariants.big} text={"Recommendations"} />
                    <Arrows />
                </div>
                <RecommendationsList />
            </SliderContext.Provider>
        </div>
    );
};


export default SliderContextProvider;