import {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    EDIT_POST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    LIKE_COUNT,
    LIKE_COUNT_SUCCESS,
    LIKE_COUNT_FAILURE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    CLEAR_ALL_ERROR,
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    collection: null,
    status: null,
    postById: null,
};

export default createReducer(initialState, {
    [GET_POSTS]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null,};
    },
    [GET_POSTS_SUCCESS]: (state, payload) => {
        return {...state,  isLoading: false, collection: [ ...payload ], isLoaded: true, };
    },
    [GET_POSTS_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [CREATE_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [CREATE_POST_SUCCESS]: (state) => {
        return {...state, collection: [], isLoading: false, isLoaded: true, };
    },
    [CREATE_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [EDIT_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [EDIT_POST_SUCCESS]: (state) => {
        return {...state, isLoading: false, isLoaded: true, };
    },
    [EDIT_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [DELETE_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [DELETE_POST_SUCCESS]: (state) => {
        return {...state, isLoading: false, isLoaded: true, };
    },
    [DELETE_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [LIKE_COUNT]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [LIKE_COUNT_SUCCESS]: (state) => {
        return {...state, isLoading: false, isLoaded: true, };
    },
    [LIKE_COUNT_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [CLEAR_ALL_ERROR]: (state) => {
        return { ...state, error: null, };
    },
});