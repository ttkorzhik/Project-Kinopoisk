import {MouseEventHandler} from "react";

export interface FilterProps {
    visibility: boolean,
    onClick: MouseEventHandler,
    onChange: () => void
}

export interface FilterState {
    order: string,
    keyword: string,
    yearFrom: string,
    yearTo: string,
    ratingFrom: string,
    ratingTo: string,
    countries: number | undefined,
    genres: number | undefined,
    type: string | undefined,
}

export interface FilterList {
    order: string,
    keyword: string,
    yearFrom: string,
    yearTo: string,
    ratingFrom: string,
    ratingTo: string,
    countries: string | undefined,
    genres: string,
    type: string | undefined,
}

export const initialStateFilter: FilterList = {
    order: "",
    keyword: "",
    yearFrom: "",
    yearTo: "",
    ratingFrom: "",
    ratingTo: "",
    countries: "",
    genres: "",
    type: ""
};

export const initialState: FilterState = {
    order: "",
    keyword: "",
    yearFrom: "",
    yearTo: "",
    ratingFrom: "",
    ratingTo: "",
    countries: 0,
    genres: 0,
    type: ""
};
