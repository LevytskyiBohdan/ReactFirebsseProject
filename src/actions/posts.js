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

import { getCollection, createDocument, getById } from '../utils/firebaseDB';

const getDataAction = () => ({ type: GET_DATA });
const getDataSuccessAction = response => ({ type: GET_DATA_SUCCESS, payload: response });
const getDataErrorAction = err => ({ type: GET_DATA_FAILURE, payload: err });

export function getData(data) {
    return dispatch => {
        dispatch(getDataAction());
        getCollection(data)
        .then(response => {
            dispatch(getDataSuccessAction(response));
        }).catch(err => {
            dispatch(getDataErrorAction(err));
        });

    }
}

const getPostAction = () => ({ type: GET_POST });
const getPostSuccessAction = response => ({ type: GET_POST_SUCCESS, payload: response });
const getPostErrorAction = err => ({ type: GET_POST_FAILURE, payload: err });

export function getPost(collection, id) {
    return dispatch => {
        dispatch(getPostAction());
        getById(collection, id)
        .then(response => {
            dispatch(getPostSuccessAction(response));
        }).catch(err => {
            dispatch(getPostErrorAction(err));
        });

    }
}

const createDataAction = () => ({ type: CREATE_DATA });
const createDataSuccessAction = response => ({ type: CREATE_DATA_SUCCESS, payload: response });
const createDataErrorAction = err => ({ type: CREATE_DATA_FAILURE, payload: err });

export function createData(data) {
    return dispatch => {
        dispatch(createDataAction());
        createDocument(data)
        .then(response => {
            dispatch(createDataSuccessAction(response));
        }).catch(err => {
            dispatch(createDataErrorAction(err));
        });

    }
}