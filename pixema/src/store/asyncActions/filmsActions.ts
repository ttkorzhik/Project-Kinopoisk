import FilmsService from "../../services/filmsService";

import {setFilteredFilmsAction} from "../reducers/filmsReducer";
import {selectFilmAction} from "../reducers/selectedFilmReducer";

export const handleFilteredFilms = (page: number = 1, str?: string): any => {
    return (dispatch: any) => {
        FilmsService.getFilmsResults(page, str)
            .then(response => dispatch(setFilteredFilmsAction(response?.items)))
            .catch(console.error)
    }
};

export const handleFilm = (id: number = 1): any => {
    return (dispatch: any) => {
        FilmsService.getFilm(id)
            .then(response => dispatch(selectFilmAction(response)))
            .catch(console.error)
    }
};