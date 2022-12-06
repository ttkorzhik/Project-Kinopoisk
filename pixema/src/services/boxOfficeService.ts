import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {IBoxOffice} from "../components/common/FilmsList/Film/interfaces";

interface BoxOfficeResults {
    total: number
    items: IBoxOffice[]
}

export default class BoxOfficeService {
    static async getBoxOffice(kinopoiskId: number): Promise<BoxOfficeResults | void> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}/box_office`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
};