import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    CLEAR_ALL_ERROR,
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    collection: [],
    status: null,
    postById: null,
};

export default createReducer(initialState, {
    [GET_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [GET_POST_SUCCESS]: (state, payload) => {
        return {...state, postById: payload, isLoading: false, isLoaded: true, status: GET_POST_SUCCESS, };
    },
    [GET_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: GET_POST_FAILURE,};
    },
    [CLEAR_ALL_ERROR]: (state) => {
        return { ...state, error: null, };
    },
});
