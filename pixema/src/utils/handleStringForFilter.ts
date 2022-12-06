import {FilterState} from "../components/Filter/interfacesForFilter";

export const handleStringForFilter = (filter: FilterState) => {
    let string = "";
    let {order, genres, countries, type, ratingFrom, ratingTo, yearFrom, yearTo, keyword} = filter;

    if (order) {
        string += `&order=${order}`
    }
    if (genres) {
        string += `&genres=${genres}`
    }
    if (type) {
        string += `&type=${type}`
    }
    if (countries) {
        string += `&countries=${countries}`
    }
    if (ratingFrom) {
        string += `&ratingFrom=${ratingFrom}`
    }
    if (ratingTo) {
        string += `&ratingTo=${ratingTo}`
    }
    if (yearFrom) {
        string += `&yearFrom=${yearFrom}`
    }
    if (yearTo) {
        string += `&yearTo=${yearTo}`
    }
    if (keyword) {
        string += `&keyword=${keyword}`
    }

    return string
};