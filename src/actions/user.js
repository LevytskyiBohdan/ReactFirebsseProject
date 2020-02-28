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
} from '../constants';


import { firebaseAuth, firebaseAuthLogout, firebaseGetCurrentUser, firebaseCreateUser, firebaseDeleteUser, firebaseEditUser } from '../utils/firebaseUser';
import { getCollectionWithQuery, } from '../utils/firebaseDB';

const userLoginAction = () => ({ type: USER_LOGIN });
const userLogedAction = response => ({ type: USER_LOGIN_SUCCESS, payload: response });
const userLoginErrorAction = err => ({ type: USER_LOGIN_FAILURE, payload: err });

export function userLogin(email, password) {
    return dispatch => {
        dispatch(userLoginAction());
        firebaseAuth(email, password)
            .then(() => firebaseGetCurrentUser())
            .then(response => {
                dispatch(userLogedAction(response));
            }).catch(err => {
                dispatch(userLoginErrorAction(err));
            });

    }
}


const userLogoutAction = () => ({ type: USER_LOGOUT });
const userLogoutedAction = response => ({ type: USER_LOGOUT_SUCCESS, payload: response });
const userLogoutErrorAction = err => ({ type: USER_LOGOUT_FAILURE, payload: err });

export function userLogout(data) {
    return dispatch => {
        dispatch(userLogoutAction());
        firebaseAuthLogout(data)
            .then(response => {
                dispatch(userLogoutedAction(response));
            }).catch(err => {
                dispatch(userLogoutErrorAction(err));
            });

    }
}

const getUser = () => ({ type: GET_USER });
const getUserSuccess = response => ({ type: GET_USER_SUCCESS, payload: response });
const getUserError = err => ({ type: GET_USER_FAILURE, payload: err });

export function getCurrentUser() {
    return dispatch => {
        dispatch(getUser());
        firebaseGetCurrentUser()
            .then(response => {
                dispatch(getUserSuccess(response));
            }).catch(err => {
                dispatch(getUserError(err));
            });

    }
}

const createUserReq = () => ({ type: CREATE_USER });
const createUserSuccess = response => ({ type: CREATE_USER_SUCCESS, payload: response });
const createUserError = err => ({ type: CREATE_USER_FAILURE, payload: err });

export function createUser(email, password) {
    return dispatch => {
        dispatch(createUserReq());
        firebaseCreateUser(email, password)
            .then(response => {
                dispatch(createUserSuccess(response));
            }).catch(err => {
                dispatch(createUserError(err));
            });
    }
}

const editUserReq = () => ({ type: EDIT_USER });
const editUserSuccess = response => ({ type: EDIT_USER_SUCCESS, payload: response });
const editUserError = err => ({ type: EDIT_USER_FAILURE, payload: err });

export function editUser(userUid, data) {
    return dispatch => {
        dispatch(editUserReq());
        firebaseEditUser(data)
            .then(() => {
                if (userUid) {
                    return fetch('https://us-central1-react-firebase-project-f71c4.cloudfunctions.net/changePostsAutor', {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ owner: userUid, newName: data.displayName })
                    })
                }
            })
            .then(() => firebaseGetCurrentUser())
            .then(response => {
                dispatch(editUserSuccess(response));
            })
            .catch(err => {
                dispatch(editUserError(err));
            });
    }
}

const deleteUserReq = () => ({ type: DELETE_USER });
const deleteUserSuccess = response => ({ type: DELETE_USER_SUCCESS, payload: response });
const deleteUserError = err => ({ type: DELETE_USER_FAILURE, payload: err });

export function deleteUser(email, password) {
    return dispatch => {
        dispatch(deleteUserReq());
        firebaseDeleteUser(email, password)
            .then(() => {
                dispatch(deleteUserSuccess(null));
            }).catch(err => {
                dispatch(deleteUserError(err));
            });
    }
}

const getUserPostsReq = () => ({ type: GET_USER_POSTS });
const getUserPostsSuccess = response => ({ type: GET_USER_POSTS_SUCCESS, payload: response });
const getUserPostsError = err => ({ type: GET_USER_POSTS_FAILURE, payload: err });

export function getUserPosts(collection, query) {
    return dispatch => {
        dispatch(getUserPostsReq());
        getCollectionWithQuery(collection, query)
            .then(response => {
                dispatch(getUserPostsSuccess(response));
            }).catch(err => {
                dispatch(getUserPostsError(err));
            });
    }
}

export const clearUserError = () => ({ type: CREAR_USER_ERROR });


