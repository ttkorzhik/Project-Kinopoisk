import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {IStaff} from "../components/common/FilmsList/Film/interfaces";

export default class StaffService {
    static async getStaff(filmId: number): Promise<IStaff[] | void> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
};