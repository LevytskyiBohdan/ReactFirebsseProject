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
    CREAR_USER_ERROR,
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    currentUser: null,
    status: null,
};

export default createReducer(initialState, {
    [USER_LOGIN]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [USER_LOGIN_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, status: USER_LOGIN_SUCCESS, };
    },
    [USER_LOGIN_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: USER_LOGIN_FAILURE,};
    },
    [USER_LOGOUT]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [USER_LOGOUT_SUCCESS]: (state, payload) => {
        return {...state, currentUser: null, isLoading: false, isLoaded: true,  status: USER_LOGOUT_SUCCESS, };
    },
    [USER_LOGOUT_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: USER_LOGOUT_FAILURE, };
    },
    [GET_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null, };
    },
    [GET_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, status: GET_USER_SUCCESS,};
    },
    [GET_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: GET_USER_FAILURE, };
    },
    [CREATE_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null, };
    },
    [CREATE_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, status: CREATE_USER_SUCCESS, };
    },
    [CREATE_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: CREATE_USER_FAILURE, };
    },
    [EDIT_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [EDIT_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: { ...payload }, isLoading: false, isLoaded: true, status: EDIT_USER_SUCCESS, };
    },
    [EDIT_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: EDIT_USER_FAILURE, };
    },
    [DELETE_USER]: state => {
        return {...state, isLoading: true, isLoaded: false, error: null, status: null,};
    },
    [DELETE_USER_SUCCESS]: (state, payload) => {
        return {...state, currentUser: payload, isLoading: false, isLoaded: true, status: DELETE_USER_SUCCESS, };
    },
    [DELETE_USER_FAILURE]: (state, err) => {
        return {...state, isLoading: false, error: err, status: DELETE_USER_FAILURE, };
    },
    [CREAR_USER_ERROR]: (state, err) => {
        return {...state, error: null, };
    },
});
