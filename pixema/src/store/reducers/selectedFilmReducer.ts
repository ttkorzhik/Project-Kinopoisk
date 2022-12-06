import {Reducer} from "redux";

import {IMovie} from "../../components/common/FilmsList/Film/interfaces";

export enum SelectedFilmAction {
    SELECT_FILM = "SELECT_FILM",
    SET_MOVIES = "SET_MOVIES",
    UPDATE_FILM = "UPDATE_FILM",
}

interface IInitialState {
    selectedFilm: IMovie | null
    movies: IMovie[]
    favorites: IMovie[]
}

const initialState: IInitialState = {
    selectedFilm: null,
    movies: [],
    favorites: []
};

export const selectedFilmReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SelectedFilmAction.SELECT_FILM:
            if (!state.favorites.find((movie: IMovie) => movie?.kinopoiskId === action.payload?.kinopoiskId)) {
                return {...state, selectedFilm: action.payload, favorites: [...state.favorites, action.payload]}
            } else return {...state, selectedFilm: action.payload, favorites: [...state.favorites]}

        case SelectedFilmAction.SET_MOVIES:
            return {...state, movies: action.payload}

        case SelectedFilmAction.UPDATE_FILM:
            const arr = state.favorites.map((item: IMovie) => item);
            const oldFilm = state.favorites.find((movie: IMovie) => movie?.kinopoiskId === action.payload?.kinopoiskId);
            const filmIndex = arr.indexOf(oldFilm);
            arr.splice(filmIndex, 1, action.payload);
            return {...state, selectedFilm: action.payload, favorites: arr}

        default:
            return state
    }
};

export const selectFilmAction = (payload: IMovie) => ({type: SelectedFilmAction.SELECT_FILM, payload});
export const setMoviesAction = (payload: IMovie[]) => ({type: SelectedFilmAction.SET_MOVIES, payload});
export const updateFilmAction = (payload: IMovie) => ({type: SelectedFilmAction.UPDATE_FILM, payload});