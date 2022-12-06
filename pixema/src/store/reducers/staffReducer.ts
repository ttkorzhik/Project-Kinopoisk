import {Reducer} from "redux";

import {IStaff} from "../../components/common/FilmsList/Film/interfaces";

enum StaffActions {
    SET_STAFF = "SET_STAFF"
}

interface IInitialState {
    staff: IStaff[] | null
}

const initialState: IInitialState = {
    staff: null
};

export const staffReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case StaffActions.SET_STAFF:
            return {staff: action.payload}

        default:
            return state
    }
};

export const setStaffAction = (payload: void | IStaff[]) => ({type: StaffActions.SET_STAFF, payload});