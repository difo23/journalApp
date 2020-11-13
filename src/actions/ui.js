import { types } from "../types/types"


export const setError = (err) => ({

    type: types.uiSetError,
    payload: err
})


export const removeError = (e) => ({

    type: types.uiRemoveError,
    payload: null
})