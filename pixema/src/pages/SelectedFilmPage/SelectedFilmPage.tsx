import React, {FC, useEffect, Suspense, lazy} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {handleFilm} from "../../store/asyncActions/filmsActions";
import {handleBoxOffice} from "../../store/asyncActions/boxOfficeActions";
import {handleStaff} from "../../store/asyncActions/staffActions";
import {setFilteredFilmsAction} from "../../store/reducers/filmsReducer";

import LazyLoader from "../../components/common/LazyLoader/LazyLoader";
import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import {RootState} from "../../store";

const SelectedFilm = lazy(() => import("../../components/common/SelectedFilm/SelectedFilm"));

const SelectedFilmPage: FC = () => {
    const dispatch = useDispatch();

    const {kinopoiskId = 1, filmId = 1} = useParams();

    const { selectedFilm } = useSelector((state: RootState) => state.selectedFilm);
    const { boxOffice } = useSelector((state: RootState) => state.boxOffice);
    const { staff } = useSelector((state: RootState) => state.staff);

    const getFilm = async () => {
        await dispatch(handleFilm(kinopoiskId ? +kinopoiskId : +filmId))
    };

    useEffect(() => {
        getFilm()
        dispatch(setFilteredFilmsAction([]))
        dispatch(handleBoxOffice(+kinopoiskId))
        dispatch(handleStaff(+kinopoiskId))
    }, [kinopoiskId, filmId])

    return (
        <MainWrapper>
            {selectedFilm &&
                <Suspense fallback={<LazyLoader />}>
                    <SelectedFilm {...selectedFilm} boxOffice={boxOffice} actors={staff} directors={staff} writers={staff} />
                </Suspense>
            }
        </MainWrapper>
    );
};

export default SelectedFilmPage;