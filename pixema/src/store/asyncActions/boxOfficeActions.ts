import BoxOfficeService from "../../services/boxOfficeService";

import {setBoxOfficeAction} from "../reducers/boxOfficeReducer";

export const handleBoxOffice = (kinopoiskId: number = 1): any => {
    return (dispatch: any) => {
        BoxOfficeService.getBoxOffice(kinopoiskId)
            .then(response => dispatch(setBoxOfficeAction(response?.items)))
            .catch(console.error)
    }
};