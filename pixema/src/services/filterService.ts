import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";

interface CountriesId {
    id: number
    country: string
}

interface GenresId {
    id: number
    genre: string
}

export default class FilterService {
    static async getCountriesId(): Promise<CountriesId[] | void> {
        return await HTTPService.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters')
            .then(responseToJSONHandler)
            .then(response => response.countries)
            .catch(console.error)
    }

    static async getGenresId(): Promise<GenresId[] | void> {
        return await HTTPService.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters')
            .then(responseToJSONHandler)
            .then(response => response.genres)
            .catch(console.error)
    }
};