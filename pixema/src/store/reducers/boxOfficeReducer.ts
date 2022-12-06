import {Reducer} from "redux";

import {IBoxOffice} from "../../components/common/FilmsList/Film/interfaces";

enum BoxOfficeActions {
    SET_BOX_OFFICE = "SET_BOX_OFFICE"
}

interface IInitialState {
    boxOffice: IBoxOffice[] | null
}

const initialState: IInitialState = {
    boxOffice: null
};

export const boxOfficeReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case BoxOfficeActions.SET_BOX_OFFICE:
            return {boxOffice: action.payload}

        default:
            return state
    }
};

export const setBoxOfficeAction = (payload: IBoxOffice[] | undefined) => ({type: BoxOfficeActions.SET_BOX_OFFICE, payload});
