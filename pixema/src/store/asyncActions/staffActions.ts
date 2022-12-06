import StaffService from "../../services/staffService";

import {setStaffAction} from "../reducers/staffReducer";

export const handleStaff = (filmId: number = 1): any => {
    return (dispatch: any) => {
        StaffService.getStaff(filmId)
            .then(response => dispatch(setStaffAction(response)))
            .catch(console.error)
    }
};