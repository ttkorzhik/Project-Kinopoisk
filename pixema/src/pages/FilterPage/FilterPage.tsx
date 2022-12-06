import React, {FC, MouseEventHandler, useEffect, useState, Suspense, lazy} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {usePagination} from "../../context/PaginationContext";
import {setLoadingAction} from "../../store/reducers/filmsReducer";
import {setFilterParamsAction} from "../../store/reducers/filterReducer";
import FilmsService from "../../services/filmsService";
import {RootState} from "../../store";

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import FilterList from "../../components/common/FilterList/FilterList";
import LazyLoader from "../../components/common/LazyLoader/LazyLoader";
import EmptyLabel from "../../components/common/EmptyLabel/EmptyLabel";

const FilmsList = lazy(() => import("../../components/common/FilmsList/FilmsList"));
const ShowMoreBtn = lazy(() => import("../../components/common/ShowMoreBtn/ShowMoreBtn"));

const FilterPage: FC = () => {
    const dispatch = useDispatch();

    const { filteredFilms } = useSelector((state: RootState) => state.films);
    const { filterParams } = useSelector((state: RootState) => state.filterParams);
    const { filterList } = useSelector((state: RootState) => state.filterParams);
    const { loading } = useSelector((state: RootState) => state.films);

    const [filterState, setFilterState] = useState<string>(filterParams);
    const [filterStateVisual, setFilterStateVisual] = useState<string[]>([]);

    const {paginationData, currentPage, totalPages, handleGetPages, handleGetFirstPage} = usePagination();

    const handleLoadingButton = (payload: boolean) => {
        dispatch(setLoadingAction(payload))
    };

    const handleChangePage: MouseEventHandler<HTMLSpanElement> = () => {
        handleLoadingButton(true)
        handleGetPages(FilmsService.getFilmsResults.bind(null, currentPage + 1, filterState), true)
        setTimeout(handleLoadingButton, 1000, false)
    };

    const removeFilterParam = (e: React.MouseEvent<HTMLButtonElement>) => {

        setFilterStateVisual(filterStateVisual.filter(item => item !== e.currentTarget.id))

        const selectedFilterParam = Object.entries(filterList).find(item => item.find(p => p === e.currentTarget.id));

        if (selectedFilterParam) {
            const arr = filterState.split("&");
            const film = arr.find(item => item.includes(selectedFilterParam[0]));

            if (film) {
                const filmIndex = arr.indexOf(film)
                arr.splice(filmIndex, 1)
                setFilterState(arr.join("&"))
                dispatch(setFilterParamsAction(filterState))
            }
        }
    };

    useEffect(() => {
        setFilterState(filterParams)

        if (filterList) {
            const filterParamsConfig: string[] = Object.values(filterList).filter(item => !!item) as string[];

            setFilterStateVisual(filterParamsConfig)
        }
    }, [filteredFilms])

    useEffect(() => {
        handleGetFirstPage(FilmsService.getFilmsResults.bind(null, 1, filterState),true)
        handleLoadingButton(false)
    }, [filterState])

    return (
        <MainWrapper>
            {filterState && <FilterList list={filterStateVisual} onClick={removeFilterParam} />}
            <Suspense fallback={<LazyLoader />}>
                {paginationData.length
                    ?
                    <FilmsList config={paginationData} />
                    :
                    <EmptyLabel text={"No films for this params"} />
                }
                {totalPages > 1 && currentPage !== totalPages && <ShowMoreBtn onClick={handleChangePage} isLoading={loading} />}
            </Suspense>
        </MainWrapper>
    );
};

export default FilterPage;