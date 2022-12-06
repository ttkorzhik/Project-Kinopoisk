import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {userReducer} from "./reducers/userReducer";
import {menuReducer} from "./reducers/menuReducer";
import {filmsReducer} from "./reducers/filmsReducer";
import {staffReducer} from "./reducers/staffReducer";
import {boxOfficeReducer} from "./reducers/boxOfficeReducer";
import {filterReducer} from "./reducers/filterReducer";
import {selectedFilmReducer} from "./reducers/selectedFilmReducer";

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    films: filmsReducer,
    staff: staffReducer,
    boxOffice: boxOfficeReducer,
    filterParams: filterReducer,
    selectedFilm: selectedFilmReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof store.getState>