import {Reducer} from "redux";

enum MenuActions {
    SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM",
}

interface IInitialState {
    menuItem: string
}

const initialState: IInitialState = {
    menuItem: "home"
};

export const menuReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case MenuActions.SET_ACTIVE_ITEM:
            return {...state, menuItem: action.payload}

        default:
            return state
    }
};

export const setMenuItemAction = (payload: string) => ({type: MenuActions.SET_ACTIVE_ITEM, payload});