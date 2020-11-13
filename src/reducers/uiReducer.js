import { types } from '../types/types.js';


const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = {}, action) => {


    switch (action.type) {
        case types.:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:

            return {};

        default:
            return state;
    }
}
