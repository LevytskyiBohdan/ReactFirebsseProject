import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    users: null,
};

export default createReducer(initialState, {
    [GET_USERS]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [GET_USERS_SUCCESS]: (state, payload) => {
        return {...state, users: payload, isLoading: false, isLoaded: true,};
    },
    [GET_USERS_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
});
