import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    CREATE_DATA,
    CREATE_DATA_SUCCESS,
    CREATE_DATA_FAILURE,
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
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
    [GET_DATA]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [GET_DATA_SUCCESS]: (state, payload) => {
        return {...state, collection: [ ...payload ], isLoading: false, isLoaded: true, status: GET_DATA_SUCCESS, };
    },
    [GET_DATA_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: GET_DATA_FAILURE,};
    },
    [CREATE_DATA]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [CREATE_DATA_SUCCESS]: (state, payload) => {
        return {...state, collection: [ ...payload ], isLoading: false, isLoaded: true, status: CREATE_DATA_SUCCESS, };
    },
    [CREATE_DATA_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: CREATE_DATA_FAILURE,};
    },
    [GET_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [GET_POST_SUCCESS]: (state, payload) => {
        return {...state, postById: payload, isLoading: false, isLoaded: true, status: GET_POST_SUCCESS, };
    },
    [GET_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: GET_POST_FAILURE,};
    },
});
