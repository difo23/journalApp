import { createStore } from 'redux';
import { authReducer, combineReducers } from '../reducers/authReducer';

const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(
    reducers
)