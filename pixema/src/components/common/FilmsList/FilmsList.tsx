import React, {FC} from 'react';

import {IMovie} from "./Film/interfaces";

import Film from "./Film/Film";

import styles from "../FilmsList/FilmList.module.css"

interface FilmListProps {
    config: IMovie[]
}

const FilmsList: FC<FilmListProps> = ({config}) => {
    return (
        <div className={styles.films}>
            {config.map(film => <Film key={`${film.kinopoiskId}`} {...film} />)}
        </div>
    );
};

export default FilmsList;