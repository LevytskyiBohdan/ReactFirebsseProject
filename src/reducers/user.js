import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_USER_POSTS,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_FAILURE,
    CREAR_USER_ERROR,
    CLEAR_ALL_ERROR,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    currentUser: null,
    userPosts:null,
    users: null,
};

export default createReducer(initialState, {
    [USER_LOGIN]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null,};
    },
    [USER_LOGIN_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true,};
    },
    [USER_LOGIN_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err,};
    },
    [USER_LOGOUT]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null,};
    },
    [USER_LOGOUT_SUCCESS]: (state) => {
        return {...state, currentUser: null, isLoading: false, isLoaded: true,};
    },
    [USER_LOGOUT_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [GET_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [GET_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, };
    },
    [GET_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [CREATE_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [CREATE_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload.user }, isLoading: false, isLoaded: true, };
    },
    [CREATE_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [EDIT_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [EDIT_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, };
    },
    [EDIT_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [DELETE_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [DELETE_USER_SUCCESS]: state => {
        return {...state, isLoading: false, isLoaded: true, };
    },
    [DELETE_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [GET_USER_POSTS]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, };
    },
    [GET_USER_POSTS_SUCCESS]: (state, payload) => {
        return {...state, userPosts: payload, isLoading: false, isLoaded: true, };
    },
    [GET_USER_POSTS_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, };
    },
    [CREAR_USER_ERROR]: (state, err) => {
        return {...state, error: null, };
    },
    [CLEAR_ALL_ERROR]: (state) => {
        return { ...state, error: null, };
    },
});
