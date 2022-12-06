import {Reducer} from "redux";

import {FilterList, FilterState} from "../../components/Filter/interfacesForFilter";

enum FilterActions {
    SET_FILTER_PARAMS = "SET_FILTER_PARAMS",
    SET_FILTER_LIST = "SET_FILTER_LIST",
}

interface IInitialState {
    filterParams: FilterState | null
    filterList: FilterList | null
}

const initialState: IInitialState = {
    filterParams: null,
    filterList: null
};

export const filterReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FilterActions.SET_FILTER_PARAMS:
            return {...state, filterParams: action.payload}
        case FilterActions.SET_FILTER_LIST:
            return {...state, filterList: action.payload}

        default:
            return state
    }
};

export const setFilterParamsAction = (payload: string) => ({type: FilterActions.SET_FILTER_PARAMS, payload});
export const setFilterList = (payload: FilterList) => ({type: FilterActions.SET_FILTER_LIST, payload});