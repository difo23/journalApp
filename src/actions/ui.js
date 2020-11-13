import { types } from "../types/types"


export const setError = (err) => ({

    type: types.uiSetError,
    payload: err
})

export const startLoading = () => ({
    type: types.uiStartLoading,
    payload: true

})
export const finishLoading = () => ({
    type: types.uiFinishLoading,
    payload: false

})

export const removeError = () => ({

    type: types.uiRemoveError,
    payload: null
})