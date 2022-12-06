import React, {FC, MouseEventHandler, useEffect, Suspense, lazy} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PageProps} from "../../constants/routes";
import FilmsService from "../../services/filmsService";
import {usePagination} from "../../context/PaginationContext";
import {setFilteredFilmsAction, setLoadingAction} from "../../store/reducers/filmsReducer";
import {RootState} from "../../store";

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import LazyLoader from "../../components/common/LazyLoader/LazyLoader";

const FilmsList = lazy(() => import("../../components/common/FilmsList/FilmsList"));
const ShowMoreBtn = lazy(() => import("../../components/common/ShowMoreBtn/ShowMoreBtn"));

const TrendsPage: FC<PageProps> = ({title}) => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.films);

    const {paginationTrends, handleGetFirstPage, currentPage, pagesCount, handleGetPages} = usePagination();

    const handleLoadingButton = (payload: boolean) => {
        dispatch(setLoadingAction(payload))
    };

    const handleChangePage: MouseEventHandler<HTMLSpanElement> = () => {
        handleLoadingButton(true)
        handleGetPages(FilmsService.getTrendsResults.bind(null, currentPage + 1), false)
        setTimeout(handleLoadingButton, 1000, false)
    };

    useEffect(() => {
        dispatch(setFilteredFilmsAction([]))
        handleGetFirstPage(FilmsService.getTrendsResults.bind(null, 1), false)
        handleLoadingButton(false)
    }, [])

    return (
        <MainWrapper title={title}>
            <Suspense fallback={<LazyLoader />}>
                <FilmsList config={paginationTrends} />
                {pagesCount > 1 && currentPage !==  pagesCount && <ShowMoreBtn onClick={handleChangePage} isLoading={loading} />}
            </Suspense>
        </MainWrapper>
    );
};

export default TrendsPage;