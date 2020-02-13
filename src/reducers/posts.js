import {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
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
    [GET_POSTS]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [GET_POSTS_SUCCESS]: (state, payload) => {
        return {...state, collection: [ ...payload ], isLoading: false, isLoaded: true, status: GET_POSTS_SUCCESS, };
    },
    [GET_POSTS_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: GET_POSTS_FAILURE,};
    },
    [CREATE_POST]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [CREATE_POST_SUCCESS]: (state, payload) => {
        return {...state, collection: [ ...payload ], isLoading: false, isLoaded: true, status: CREATE_POST_SUCCESS, };
    },
    [CREATE_POST_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: CREATE_POST_FAILURE,};
    },
});
