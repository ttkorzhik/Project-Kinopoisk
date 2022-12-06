import React, {FC, MouseEventHandler, Suspense, lazy, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {usePagination} from "../../context/PaginationContext";
import {setFilteredFilmsAction, setLoadingAction} from "../../store/reducers/filmsReducer";
import FilmsService from "../../services/filmsService";
import {RootState} from "../../store";

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import LazyLoader from "../../components/common/LazyLoader/LazyLoader";

const FilmsList = lazy(() => import("../../components/common/FilmsList/FilmsList"));
const ShowMoreBtn = lazy(() => import("../../components/common/ShowMoreBtn/ShowMoreBtn"));

const HomePage: FC = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.films);

    const {paginationData, handleGetFirstPage, currentPage, totalPages, handleGetPages} = usePagination();

    const handleLoadingButton = (payload: boolean) => {
        dispatch(setLoadingAction(payload))
    };

    const handleChangePage: MouseEventHandler<HTMLSpanElement> = () => {
        handleLoadingButton(true)
        handleGetPages(FilmsService.getFilmsResults.bind(null, currentPage + 1), true)
        setTimeout(handleLoadingButton, 1000, false)
    };

    useLayoutEffect(() => {
        dispatch(setFilteredFilmsAction([]))
        handleGetFirstPage(FilmsService.getFilmsResults.bind(null, 1), true)
        handleLoadingButton(false)
    }, [])

    return (
        <MainWrapper>
                <Suspense fallback={<LazyLoader />}>
                    <FilmsList config={paginationData} />
                </Suspense>
            {totalPages > 1 && currentPage !== totalPages &&
                <Suspense>
                    <ShowMoreBtn onClick={handleChangePage} isLoading={loading} />
                </Suspense>
            }
        </MainWrapper>
    );
};

export default HomePage;