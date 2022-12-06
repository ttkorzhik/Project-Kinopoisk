import React, {FC} from 'react';

import {useTheme} from "../../../context/ThemeContext";
import {useScreenWidth} from "../../../context/ScreenWidthContext";
import {IMovie, StaffType} from "../FilmsList/Film/interfaces";

import Table from "../Table/Table";
import SelectedFilmActions from "./SelectedFilmActions/SelectedFilmActions";
import SliderContext from "../../../context/SliderContext/SliderContext";

import IMDb from "../../../assets/IMDb.svg";

import styles from "./SelectedFilm.module.css";

const SelectedFilm: FC<IMovie> = (props) => {
    const { isLightTheme } = useTheme();

    const { isMobileView } = useScreenWidth();

    let {
        posterUrl,
        ratingAgeLimits,
        genres,
        nameRu,
        ratingKinopoisk,
        filmLength,
        description,
        year,
        boxOffice,
        countries,
        actors,
        directors,
        writers
    } = props;

    const ageLimit = ratingAgeLimits?.replace(/[^0-9]/g, "");

    const boxOfficeFull = boxOffice
                                ?.filter(item => item.type === "BUDGET")
                                .map(item => item.symbol + item.amount)
                                .join();

    const countryString = countries
                                ?.map(item => item.country[0].toUpperCase() + item.country.slice(1))
                                .join(", ");

    const actorsString = actors
                            ?.filter(item => item.professionKey === StaffType.actor)
                            .map(item => !item.nameRu ? item.nameEn : item.nameRu)
                            .slice(0, 5)
                            .join(", ");

    const directorsString = directors
                                ?.filter(item => item.professionKey === StaffType.director)
                                .map(item => !item.nameRu ? item.nameEn : item.nameRu)
                                .slice(0, 5)
                                .join(", ");

    const writersString = writers
                                ?.filter(item => item.professionKey === StaffType.writer)
                                .map(item => !item.nameRu ? item.nameEn : item.nameRu)
                                .slice(0, 5)
                                .join(", ");

    const genreString = genres
                            ?.map(item => item.genre[0].toUpperCase() + item.genre.slice(1))
                            .join(" • ");

    const SELECTED_FILM_CONFIG = [
        {
            tableHeader: "Год производства",
            tableData: year
        },
        {
            tableHeader: "Возраст",
            tableData: !ratingAgeLimits ? "+16" : ("+" + ageLimit)
        },
        {
            tableHeader: "Бюджет",
            tableData: !boxOfficeFull ? "$1000000" : boxOfficeFull
        },
        {
            tableHeader: "Страна",
            tableData: countryString
        },
        {
            tableHeader: "Актёры",
            tableData: !actorsString ? "-" : actorsString
        },
        {
            tableHeader: "Режиссёры",
            tableData: !directorsString ? "-" : directorsString
        },
        {
            tableHeader: "Сценарий",
            tableData: !writersString ? "-" : writersString
        }
    ];
    
    return (
        <div className={styles.selectedFilm}>
            {!isMobileView &&
                <div className={styles.selectedFilmLeftSide}>
                    <img src={posterUrl} className={styles.poster} loading="lazy" alt="poster" />
                    <SelectedFilmActions film={props} />
                </div>
            }
            <div className={styles.selectedFilmRightSide}>
                <div className={styles.selectedFilmGenre}>{genreString}</div>
                <h1 className={`${styles.selectedFilmTitle} ${isLightTheme && styles.light}`}>{nameRu}</h1>
                <div className={styles.selectedFilmMarkers}>
                    {ratingKinopoisk === null
                        ?
                        <div className={`${styles.yellow}`}>{5}</div>
                        :
                        <div className={`${ratingKinopoisk < 5 ? styles.red : ratingKinopoisk >= 7 ? styles.ratings : styles.yellow}`}>
                            {ratingKinopoisk}
                        </div>
                    }
                    <div className={`${styles.imdb} ${isLightTheme && styles.lightMarkers}`}>
                        <img src={IMDb} alt="imdb" />
                        {ratingKinopoisk ? ratingKinopoisk : 5}
                    </div>
                    <div className={`${styles.runTime} ${isLightTheme && styles.lightMarkers}`}>
                        {!filmLength ? 120 : filmLength} min
                    </div>
                </div>
                {isMobileView &&
                    <div className={styles.selectedFilmLeftSide}>
                        <img src={posterUrl} className={styles.poster} loading="lazy" alt="poster" />
                        <SelectedFilmActions film={props} />
                    </div>
                }
                {!!description &&
                    <div className={`${styles.selectedFilmPlot} ${isLightTheme && styles.light}`}>{description}</div>
                }
                <div className={styles.selectedFilmDescription}>
                    <Table config={SELECTED_FILM_CONFIG} />
                    <div className={styles.recommendations}>
                        <SliderContext str={genres?.length ? genres[0].genre : "комедия"} autoPlay={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedFilm;