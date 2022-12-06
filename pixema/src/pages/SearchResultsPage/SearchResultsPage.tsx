import React, {FC, MouseEventHandler, useEffect, Suspense, lazy} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import {usePagination} from "../../context/PaginationContext";
import {setMoviesAction} from "../../store/reducers/selectedFilmReducer";
import {setLoadingAction} from "../../store/reducers/filmsReducer";
import SearchFilmsService from "../../services/searchFilmsService";
import {RootState} from "../../store";

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import LazyLoader from "../../components/common/LazyLoader/LazyLoader";
import EmptyLabel from "../../components/common/EmptyLabel/EmptyLabel";

const SearchResults = lazy(() => import("../../components/common/SearchResults/SearchResults"));
const ShowMoreBtn = lazy(() => import("../../components/common/ShowMoreBtn/ShowMoreBtn"));

const SearchResultsPage: FC = () => {
    const dispatch = useDispatch();

    const { search } = useLocation();

    const { loading } = useSelector((state: RootState) => state.films);

    const {paginationTrends, handleGetFirstPage, currentPage, pagesCount, handleGetPages} = usePagination();

    const query = search.split("?keyword=")[1];

    const handleSearch = async () => {
        const response = await SearchFilmsService.getSearchFilms(1, query);

        const { films } = response;

        if (Array.isArray(films)) {
            dispatch(setMoviesAction(films))
        }
    };

    const handleLoadingButton = (payload: boolean) => {
        dispatch(setLoadingAction(payload))
    };

    const handleChangePage: MouseEventHandler<HTMLSpanElement> = () => {
        handleLoadingButton(true)
        handleGetPages(SearchFilmsService.getSearchFilms.bind(null, currentPage + 1, query), false)
        setTimeout(handleLoadingButton, 1000, false)
    };

    const decode_utf8 = (query: string) => {
        return decodeURIComponent(query)
    };

    useEffect(() => {
        handleSearch()
        handleGetFirstPage(SearchFilmsService.getSearchFilms.bind(null, 1, query), false)
        handleLoadingButton(false)
    }, [search])

    return (
        <MainWrapper>
            {paginationTrends.length
                ?
                <Suspense fallback={<LazyLoader />}>
                    <SearchResults matches={paginationTrends} />
                </Suspense>
                :
                <EmptyLabel text={`No results for "${decode_utf8(query)}"`} />
            }
            {pagesCount > 1 && currentPage !== pagesCount &&
                <Suspense>
                    <ShowMoreBtn onClick={handleChangePage} isLoading={loading} />
                </Suspense>
            }
        </MainWrapper>
    );
};

export default SearchResultsPage;