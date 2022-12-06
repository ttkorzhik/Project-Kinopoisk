import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {IMovie} from "../components/common/FilmsList/Film/interfaces";

interface SearchFilms {
    keyword: string | null
    pagesCount: number
    films: IMovie[]
}

export default class SearchFilmsService {
    static async getSearchFilms(pagesCount: number = 1, keyword: string | null = null): Promise<SearchFilms> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${pagesCount}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
};