import {Reducer} from "redux";

enum UserActions {
    SET_USER = "SET_USER",
}

interface IInitialState {
    user: any | null
}

const initialState: IInitialState = {
    user: null
};

export const userReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActions.SET_USER:
            return {...state, user: action.payload}

        default:
            return state
    }
};

export const setUserAction = (payload: any) => ({type: UserActions.SET_USER, payload});