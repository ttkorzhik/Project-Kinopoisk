import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {IMovie} from "../components/common/FilmsList/Film/interfaces";

export interface FilmsResults {
    total: number
    totalPages: number
    items: IMovie[]
}

export interface TrendsResult {
    pagesCount: number
    films: IMovie[]
}

export default class FilmsService {
    static async getFilmsResults(page: number = 1, str?: string): Promise<FilmsResults | void> {
        if (str) {
            return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}${str}`)
                .then(responseToJSONHandler)
                .catch(console.error)
        } else return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }

    static async getTrendsResults(page: number = 1): Promise<TrendsResult | void> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }

    static async getFilm(id: number): Promise<any> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
};