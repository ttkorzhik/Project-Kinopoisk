import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PageProps} from "../../constants/routes";
import {IMovie} from "../../components/common/FilmsList/Film/interfaces";
import {setFilteredFilmsAction} from "../../store/reducers/filmsReducer";
import {RootState} from "../../store";

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import FilmsList from "../../components/common/FilmsList/FilmsList";
import EmptyLabel from "../../components/common/EmptyLabel/EmptyLabel";

const FavoritesPage: FC<PageProps> = ({title}) => {
    const dispatch = useDispatch();

    const [films, setFilms] = useState<IMovie[]>([]);

    const { favorites } = useSelector((state: RootState) => state.selectedFilm);

    const addFilmToFavorites = () => {
        if (favorites.length) {
            const favoritesItems = favorites?.filter((movie: IMovie) => movie?.favorite);
            setFilms(favoritesItems)
        } else setFilms([])
    }

    useEffect(() => {
        dispatch(setFilteredFilmsAction([]))
        addFilmToFavorites()
    }, [favorites])

    return (
        <MainWrapper title={title}>
            {films.length ? <FilmsList config={films} /> : <EmptyLabel text={"Add your favorite movie"} />}
        </MainWrapper>
    );
};

export default FavoritesPage;