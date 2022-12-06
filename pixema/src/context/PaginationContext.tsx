import React, {FC, createContext, useContext, useState} from 'react';

import {IMovie} from "../components/common/FilmsList/Film/interfaces";
import {FilmsResults, TrendsResult} from "../services/filmsService";
import {WithChildren} from "../types/withChildren";

const PaginationContext = createContext<PaginationContextValue | null>(null);

interface PaginationContextValue {
    currentPage: number
    paginationData: IMovie[]
    paginationTrends: IMovie[]
    totalPages: number
    pagesCount: number
    handleGetPages: (callback: () => Promise<FilmsResults | void | TrendsResult>, main: boolean) => Promise<void>
    handleGetFirstPage: (callback: (str: string) => Promise<FilmsResults | void | TrendsResult>, main: boolean) => Promise<void>
}

const PaginationProvider: FC<WithChildren> = ({ children }) =>  {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageWithAllItems, setPageWithAllItems] = useState<IMovie[]>([]);
    const [paginationData, setPaginationData] = useState<IMovie[]>([]);
    const [pageWithTrends, setPageWithTrends] = useState<IMovie[]>([]);
    const [paginationTrends, setPaginationTrends] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(1);

    const handleGetPages = async (callback: () => Promise<FilmsResults | void | TrendsResult>, main: boolean) => {
        setCurrentPage(currentPage + 1);
        // @ts-ignore
        const {items, films} = await callback();

        if (main) {
            setPageWithAllItems([...pageWithAllItems, ...items]);
            setPaginationData([...pageWithAllItems, ...items]);
        } else {
            setPageWithTrends([...pageWithTrends, ...films]);
            setPaginationTrends([...pageWithTrends, ...films]);
        }
    };

    const handleGetFirstPage = async (callback: (str: string) => Promise<void | FilmsResults | TrendsResult>, main: boolean) => {
        setCurrentPage(1);
        // @ts-ignore
        const {items, totalPages, films, pagesCount} = await callback();

        if (main) {
            setTotalPages(totalPages);
            setPageWithAllItems([...items]);
            setPaginationData([...items]);
        } else {
            setPagesCount(pagesCount)
            setPageWithTrends(films);
            setPaginationTrends(films);
        }

        setCurrentPage(1);
    };

    return (
        <PaginationContext.Provider value={{
            currentPage,
            paginationData,
            paginationTrends,
            totalPages,
            pagesCount,
            handleGetPages,
            handleGetFirstPage
        }}>
            {children}
        </PaginationContext.Provider>
    )
};

function usePagination() {
    const context = useContext(PaginationContext);

    if (context === null) {
        throw new Error("usePagination must be used with PaginationProvider")
    }

    return context
}

export {usePagination, PaginationProvider};