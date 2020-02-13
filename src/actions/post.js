import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
} from '../constants';

import { getById, createDocument } from '../utils/firebaseDB';

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

const createPostAction = () => ({ type: CREATE_POST });
const createPostSuccessAction = response => ({ type: CREATE_POST_SUCCESS, payload: response });
const createPostErrorAction = err => ({ type: CREATE_POST_FAILURE, payload: err });

export function createPost(data) {
    return dispatch => {
        dispatch(createPostAction());
        createDocument(data)
        .then(response => {
            dispatch(createPostSuccessAction(response));
        }).catch(err => {
            dispatch(createPostErrorAction(err));
        });

    }
}
