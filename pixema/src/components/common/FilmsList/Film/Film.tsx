import React, {FC, useMemo} from 'react';
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import {useTheme} from "../../../../context/ThemeContext";
import {IMovie} from "./interfaces";
import {Routes} from "../../../../constants/routes";
import {updateFilmAction} from "../../../../store/reducers/selectedFilmReducer";

import Button, {BtnVariants} from "../../Button/Button";

import Flame from "../../../../assets/Flame.svg";
import PurpleBookmark from "../../../../assets/PurpleBookmark.svg";

import styles from "../Film/Film.module.css";

interface FilmProps extends IMovie {
    className?: string
}

const Film: FC<FilmProps> = (props) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const { isLightTheme } = useTheme();

    let {kinopoiskId, filmId, nameRu = "No name", genres, posterUrl, ratingKinopoisk, rating, favorite} = props;

    const genreString = genres.map(item => item.genre[0].toUpperCase() + item.genre.slice(1)).slice(0, 3).join(" • ");

    const handleSelectedFilmPageOpen = () => navigate(`/home/${!kinopoiskId ? filmId : kinopoiskId}`);

    const handleDeleteFavorite = () => {
        dispatch(updateFilmAction({...props, favorite: !props.favorite}))
    };

    const renderRating = useMemo(() => {
        switch (pathname) {
            case Routes["trends"]:
                return true

            default:
                return false
        }
    }, [pathname]);

    const calcRating = (rating: string) => {
        const parsedRating = parseFloat(rating);

        if (isNaN(parsedRating)) {
            return 5
        }

        return parsedRating
    };

    return (
        <div className={`${styles.filmWrapper} ${props.className}`}>
            <div className={styles.block}>
                <img src={posterUrl} className={styles.filmImg} onClick={handleSelectedFilmPageOpen} loading="lazy" alt="film" />
                {renderRating
                    ?
                    <div className={styles.trendsRatingBlock}>
                        <img src={Flame} alt="flameIcon" />
                        <p className={styles.trendsRating}>{!rating ? 5 : parseFloat(rating as string)}</p>
                    </div>
                    :
                    ratingKinopoisk === null
                        ?
                        <div className={styles.yellow}>{5}</div>
                        :
                        <div className={`${ratingKinopoisk < 5 ? styles.red : ratingKinopoisk >= 7 ? styles.filmRating : styles.yellow}`}>
                            {ratingKinopoisk}
                        </div>
                }
                {!renderRating && rating &&
                    <p className={`${(calcRating(rating) < 5) ? styles.red : (calcRating(rating) >= 7) ? styles.filmRating : styles.yellow}`}>
                        {rating !== "null" ? rating : 5}
                    </p>
                }
                {favorite &&
                    <Button
                        onClick={handleDeleteFavorite}
                        variant={BtnVariants.forIcon}
                        className={`${styles.favorite} ${isLightTheme && styles.favoriteLight}`}
                    >
                        <img src={PurpleBookmark} alt="bookmarkIcon" />
                    </Button>
                }
            </div>
            <h3
                className={`${isLightTheme ? styles.light : styles.dark} ${styles.filmTitle}`}
                onClick={handleSelectedFilmPageOpen}
            >
                {nameRu}
            </h3>
            <p className={styles.filmGenre}>{genreString}</p>
        </div>
    );
};

export default Film;