import { types } from '../types/types';

export const login = (uid, displayName) => ({

    type: types.Login,
    payload: {
        uid,
        displayName
    }

})