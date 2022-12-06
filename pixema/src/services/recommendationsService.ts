import {SetStateAction} from "react";

import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";

export default class RecommendationsService {
    static async getRecommendations(id: number = 1): Promise<SetStateAction<never[]>> {
        return await HTTPService.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${id}`)
            .then(responseToJSONHandler)
            .then((response) => {
                const result: never[] = [];

                response.items.forEach((response: never) => {
                    result.push(response)
                });

                return result;
            })
    }
};