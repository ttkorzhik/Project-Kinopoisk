import {Reducer} from "redux";

import {IMovie} from "../../components/common/FilmsList/Film/interfaces";

export enum FilmsActions {
    SET_FILTERED_FILMS = "SET_FILTERED_FILMS",
    SET_LOADING = "SET_LOADING"
}

interface IInitialState {
    films: IMovie[]
    filteredFilms: IMovie[]
    loading: boolean
}

const initialState: IInitialState = {
    films: [],
    filteredFilms: [],
    loading: true
};

export const filmsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FilmsActions.SET_FILTERED_FILMS:
            return {...state, filteredFilms: action.payload}
        case FilmsActions.SET_LOADING:
            return {...state, loading: action.payload}

        default:
            return state
    }
};

export const setFilteredFilmsAction = (payload: IMovie[] | undefined) => ({type: FilmsActions.SET_FILTERED_FILMS, payload});
export const setLoadingAction = (payload: boolean) => ({type: FilmsActions.SET_LOADING, payload});