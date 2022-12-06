import React, {FC} from 'react';

import Film from "../FilmsList/Film/Film";

import {IMovie} from "../FilmsList/Film/interfaces";

import styles from "./SearchResults.module.css";

interface SearchResultsProps {
    matches: IMovie[]
}

const SearchResults: FC<SearchResultsProps> = ({matches = []}) => {
    return (
        <div className={styles.searchResults}>
            {!!matches.length && matches.map((film: IMovie) => <Film key={film.kinopoiskId} {...film} />)}
        </div>
    );
};

export default SearchResults;